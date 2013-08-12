package medoffice;

import com.semanticprogrammer.lib.commons.Util;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
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
import medoffice.entity.Appointment;
import medoffice.entity.MyOffice;
import medoffice.entity.PatientInsurance;
import medoffice.entity.ReferringProvider;
import medoffice.entity.Visit;
import medoffice.entity.VisitDoc;
import medoffice.entity.VisitPayment;

@WebServlet(urlPatterns = {"/visit-doc"})
public class VisitDocServlet extends HttpServlet {

   @EJB
   private CrudService crudService;

   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
      try {
         res.setContentType("image/svg+xml");
         res.setHeader("Cache-Control", "private");
         res.setHeader("Pragma", "no-cache");
         int id = Integer.parseInt(req.getParameter("id"));
         VisitDoc doc = crudService.find(id, VisitDoc.class);
         int page = Integer.parseInt(req.getParameter("page"));
         File docFile = new File(req.getServletContext().getRealPath("/VisitDoc/" + doc.getPath(page)));
         String docContent = Util.getFileContent(docFile);
         if (!doc.isStatic_()) {
            String officeCode = req.getParameter("office");
            MyOffice office = crudService.find(officeCode, MyOffice.class);
            Visit visit = null;
            if (req.getParameter("visit") != null) {
               int visitId = Integer.parseInt(req.getParameter("visit"));
               visit = crudService.find(visitId, Visit.class);
            }
            Appointment appointment = null;
            if (visit == null && req.getParameter("appointment") != null) {
               int appointmentId = Integer.parseInt(req.getParameter("appointment"));
               appointment = crudService.find(appointmentId, Appointment.class);
            }
            Map params = null;
            if (visit != null) {
               ReferringProvider referringProvider = null;
               if (visit.getReferringProviderNpi() != null) {
                  referringProvider = crudService.find(visit.getReferringProviderNpi(), ReferringProvider.class);
               }
               params = params(visit, referringProvider, office);
            } else if (appointment != null) {
               ReferringProvider referringProvider = null;
               if (appointment.getReferringProviderNpi() != null) {
                  referringProvider = crudService.find(appointment.getReferringProviderNpi(), ReferringProvider.class);
               }
               params = params(appointment, referringProvider, office);
            }
            String genContent = transform(docContent, params);
            res.getWriter().print(genContent);
         } else {
            String genContent = transform(docContent, null);
            res.getWriter().print(genContent);
         }
         res.getWriter().close();
      } catch (Exception ex) {
         Logger.getLogger(VisitDocServlet.class.getName()).log(Level.SEVERE, null, ex);
      }
   }

   @Override
   @SuppressWarnings("unchecked")
   protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
      doGet(req, res);
   }

   public static Map params(Visit visit, ReferringProvider referringProvider, MyOffice office) {
      Map<String, String> params = new LinkedHashMap();
      params.put("PATIENT", visit.getPatient().getLastName() + ", " + visit.getPatient().getFirstName());
      params.put("AGE", visit.getPatient().getAge() + "");
      params.put("PROVIDER", visit.getOfficeProvider().getAlias());
      if (referringProvider != null) {
         params.put("REFPROVIDER", referringProvider.getLastName() + " " + referringProvider.getFirstName() + (referringProvider.getSuffix() != null && ! referringProvider.getSuffix().trim().isEmpty() ? ", " + referringProvider.getSuffix() : ""));
      } else {
         params.put("REFPROVIDER", "");
      }
      params.put("OFFICECODE", office.getCode().toUpperCase());
      params.put("CADDRESS", office.getAddress() + ", " + office.getCity() + ", " + office.getState() + " " + office.getZipCode());
      params.put("MRN", visit.getPatient().getId() + "");
      params.put("SEX", visit.getPatient().getSex() + "");
      params.put("DOB", (new SimpleDateFormat("MM/dd/yy")).format(visit.getPatient().getBirthDate()));
      params.put("DOS", (new SimpleDateFormat("MM/dd/yy")).format(visit.getDate()));
      params.put("HOMEPHONE", visit.getPatient().getHomePhone());
      params.put("ADDRESS1", visit.getPatient().getAddress());
      params.put("ADDRESS2", visit.getPatient().getCity() + ", " + visit.getPatient().getState() + " " + visit.getPatient().getZipCode());
      params.put("INSURANCE1", "");
      params.put("INSURANCE2", "");
      for (int i = 0; i < visit.getPatient().getInsuranceList().size(); i++) {
         PatientInsurance pi = visit.getPatient().getInsuranceList().get(i);
         params.put("INSURANCE" + (i + 1), pi.getInsurance().getName() + (pi.getMemberId() != null ? "  ID:" + pi.getMemberId() : ""));
      }
      params.put("PTYPE1", "");
      params.put("PTYPE2", "");
      params.put("PTYPE3", "");
      params.put("PTYPE4", "");
      params.put("PMETHOD1", "");
      params.put("PMETHOD2", "");
      params.put("PMETHOD3", "");
      params.put("PMETHOD4", "");
      params.put("PAMOUNT1", "");
      params.put("PAMOUNT2", "");
      params.put("PAMOUNT3", "");
      params.put("PAMOUNT4", "");
      params.put("PCHECKNUM1", "");
      params.put("PCHECKNUM2", "");
      params.put("PCHECKNUM3", "");
      params.put("PCHECKNUM4", "");
      for (int i = 0; i < visit.getPaymentList().size(); i++) {
         VisitPayment vp = visit.getPaymentList().get(i);
         params.put("PTYPE" + (i + 1), vp.getPaymentType().getName());
         params.put("PMETHOD" + (i + 1), vp.getPaymentMethod().getName());
         params.put("PAMOUNT" + (i + 1), String.format("$%.2f", vp.getAmount().floatValue()));
      }
      return params;
   }

   public static Map params(Appointment appointment, ReferringProvider referringProvider, MyOffice office) {
      Map<String, String> params = new LinkedHashMap();
      params.put("PATIENT", appointment.getPatient().getLastName() + ", " + appointment.getPatient().getFirstName());
      params.put("AGE", appointment.getPatient().getAge() + "");
      params.put("PROVIDER", appointment.getOfficeProvider().getAlias());
      if (referringProvider != null) {
         params.put("REFPROVIDER", referringProvider.getLastName() + " " + referringProvider.getFirstName() + (referringProvider.getSuffix() != null && ! referringProvider.getSuffix().trim().isEmpty() ? ", " + referringProvider.getSuffix() : ""));
      } else {
         params.put("REFPROVIDER", "");
      }
      params.put("OFFICECODE", office.getCode().toUpperCase());
      params.put("CADDRESS", office.getAddress() + ", " + office.getCity() + ", " + office.getState() + " " + office.getZipCode());
      params.put("MRN", appointment.getPatient().getId() + "");
      params.put("SEX", appointment.getPatient().getSex() + "");
      params.put("DOB", (new SimpleDateFormat("MM/dd/yy")).format(appointment.getPatient().getBirthDate()));
      params.put("DOS", (new SimpleDateFormat("MM/dd/yy")).format(appointment.getDate()));
      params.put("HOMEPHONE", appointment.getPatient().getHomePhone());
      params.put("ADDRESS1", appointment.getPatient().getAddress());
      params.put("ADDRESS2", appointment.getPatient().getCity() + ", " + appointment.getPatient().getState() + " " + appointment.getPatient().getZipCode());
      params.put("INSURANCE1", "");
      params.put("INSURANCE2", "");
      for (int i = 0; i < appointment.getPatient().getInsuranceList().size(); i++) {
         PatientInsurance pi = appointment.getPatient().getInsuranceList().get(i);
         params.put("INSURANCE" + (i + 1), pi.getInsurance().getName() + "  ID:" + pi.getMemberId());
      }
      return params;
   }

   public static String transform(String content, Map<String, String> params) {
      content = content.replaceAll("(font-size:[\\d\\.]+);", "$1px;");
      content = content.replaceAll("(<tspan[^>]+)x=\"[^\"]+\"([^>]*>&lt;[\\w]+&gt;)", "$1$2");
      if (params != null) {
         for (String key : params.keySet()) {
            content = content.replaceAll("(<[^>]+ id=\"" + key + "_*\"[^<]*>)[^<]*</", "$1" + escape(params.get(key)) + "</");
         }
         content = unescape(content);
      }
      return content;
   }

   private static String escape(String val) {
      val = val.replace("$", "_dollar_");
      return val;
   }

   private static String unescape(String val) {
      val = val.replace("_dollar_", "$");
      return val;
   }
}
