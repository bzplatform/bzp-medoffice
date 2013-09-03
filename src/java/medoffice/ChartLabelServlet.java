package medoffice;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Formatter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jsftoolkit.ejb.CrudService;
import medoffice.entity.Patient;
import medoffice.entity.SvgSource;
import net.sourceforge.barbecue.Barcode;
import net.sourceforge.barbecue.BarcodeFactory;
import net.sourceforge.barbecue.BarcodeImageHandler;
import sun.misc.BASE64Encoder;

@WebServlet(urlPatterns = {"/chart-label"})
public class ChartLabelServlet extends HttpServlet {

   @EJB
   private CrudService crudService;
   private int version = 0;
   private String tmplContent = null;

   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
      try {
         res.setContentType("image/svg+xml");
         res.setHeader("Cache-Control", "private");
         res.setHeader("Pragma", "no-cache");
         String id = req.getParameter("id");
         if (id == null) {
            SvgSource chartYearColor = crudService.find("chart-year-color", SvgSource.class, "_HEALTHCARE");
            res.getWriter().print(chartYearColor.getSource());
            res.getWriter().close();
            return;
         }
         SvgSource chartLabelTmpl = crudService.find("chart-label-tmpl", SvgSource.class, "_HEALTHCARE");
         if (chartLabelTmpl.getVersion() == 0 || chartLabelTmpl.getVersion() > version || tmplContent == null) {
            version = chartLabelTmpl.getVersion();
            tmplContent = chartLabelTmpl.getSource();
         }
         String year = req.getParameter("year").replaceFirst(".*(\\d\\d)", "$1");
         if (year == null || year.isEmpty() || !year.matches("\\d\\d")) {
            year = (new SimpleDateFormat("yy")).format(new Date());
         }
         String office = req.getParameter("office");
         if (office == null || office.isEmpty()) {
            office = "mid";
         }
         Integer patientId = Integer.parseInt(id);
         Patient patient = crudService.find(patientId, Patient.class, office);
         String volume = "";
         Map<String, String> params = params(patientId, patient.getLastName(), patient.getFirstName(), patient.getBirthDate(), year, volume);

         Barcode barcode = BarcodeFactory.createCode128A((new Formatter()).format("%06d", patientId).toString());
         barcode.setBarHeight(80);
         barcode.setBarWidth(1);
         ByteArrayOutputStream baos = new ByteArrayOutputStream();
         BarcodeImageHandler.writePNG(barcode, baos);
         String encodedImage = new BASE64Encoder().encode(baos.toByteArray());

         params.put("img-barcode", encodedImage);
         String genContent = transform(tmplContent, params);
         res.getWriter().print(genContent);
         res.getWriter().close();

      } catch (Exception ex) {
         Logger.getLogger(ChartLabelServlet.class.getName()).log(Level.SEVERE, null, ex);
      }
   }

   @Override
   @SuppressWarnings("unchecked")
   protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
      doGet(req, res);
   }

   public static Map mrnFillMap() {
      Map<String, String> fillMap = new LinkedHashMap();
      fillMap.put("0", "ffff00");
      fillMap.put("1", "2080ff");
      fillMap.put("2", "ffc0c0");
      fillMap.put("3", "800080");
      fillMap.put("4", "ec7600");
      fillMap.put("5", "800000");
      fillMap.put("6", "00c000");
      fillMap.put("7", "c0c0c0");
      fillMap.put("8", "ff0000");
      fillMap.put("9", "606060");
      return fillMap;
   }

   public static Map params(int patientId, String patientLastName, String patientFirstName, Date birthdate, String year, String volume) {
      Map<String, String> params = new LinkedHashMap();
      Map<String, String> mrnFillMap = mrnFillMap();
      Map<String, String> yearFillMap = yearFillMap();
      String mrn = (new Formatter()).format("%06d", patientId).toString();
      params.put("patient", patientLastName + ", " + patientFirstName);
      params.put("birthdate", (new SimpleDateFormat("MM/dd/yy")).format(birthdate));
      params.put("mrn", mrn);
      params.put("mrn1", mrn.substring(5, 6));
      params.put("mrn2", mrn.substring(4, 5));
      params.put("mrn3", mrn.substring(3, 4));
      params.put("mrn4", mrn.substring(2, 3));
      params.put("mrn5", mrn.substring(1, 2));
      params.put("mrn6", mrn.substring(0, 1));
      params.put("year", year);
      params.put("volume", volume);
      params.put("bg-mrn1", mrnFillMap.get(params.get("mrn1")));
      params.put("bg-mrn2", mrnFillMap.get(params.get("mrn2")));
      params.put("bg-mrn3", mrnFillMap.get(params.get("mrn3")));
      params.put("bg-year", yearFillMap.get(params.get("year").substring(1, 2)));
      return params;
   }

   public static Map yearFillMap() {
      Map<String, String> fillMap = new LinkedHashMap();
      fillMap.put("0", "ffff00");
      fillMap.put("1", "ff0000");
      fillMap.put("2", "70dcff");
      fillMap.put("3", "800080");
      fillMap.put("4", "ec7600");
      fillMap.put("5", "800000");
      fillMap.put("6", "00c000");
      fillMap.put("7", "c0c0c0");
      fillMap.put("8", "2080ff");
      fillMap.put("9", "606060");
      return fillMap;
   }

   public static String transform(String content, Map<String, String> params) {
      for (String key : params.keySet()) {
         if (key.startsWith("bg-")) {
            content = content.replaceAll("(<[^>]+ id=\"" + key + "(?:_[^\"]+)?\"[^>]+ style=\"fill:)[^;]+(;[^>]+/>)", "$1#" + params.get(key) + "$2");
         } else if (key.startsWith("img-")) {
            content = content.replaceAll("(<[^>]+ id=\"" + key + "(?:_[^\"]+)?\"[^>]+ xlink:href=\"data:image/png;base64,)[^\"]+", "$1" + params.get(key));
         } else {
            content = content.replaceAll("(<[^>]+ id=\"" + key + "(?:_[^\"]+)?\"[^>]+>)[^<]*</", "$1" + params.get(key) + "</");
         }
      }
      return content;
   }
}
