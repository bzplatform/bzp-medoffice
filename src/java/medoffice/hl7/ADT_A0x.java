package medoffice.hl7;

import java.util.Date;
import java.util.Formatter;
import medoffice.entity.Guarantor;
import medoffice.entity.Patient;
import medoffice.entity.PatientInsurance;

public class ADT_A0x {

   private String message;

   public String getMessage() {
      return message;
   }

   public void setMessage(String message) {
      this.message = message;
   }

   public void process(Patient patient) {
      Formatter fmt = new Formatter();
      String eventType = (patient.getBillingAccountId() != null) ? "A08" : "A04";
      fmt.format("MSH|^~\\&|MEDENTERPRISE|LMAP|MEDENTERPRISE|2|%tY%1$tm%1$td%1$tH%1$tM%1$tS||ADT^%s|1|P|2.3|||AL" + (char) 0xD, new Date(), eventType);
      fmt.format("EVN|%2$s|%1$tY%<tm%<td%<tH%<tM" + (char) 0xD, new Date(), eventType);
      fmt.format("PID|||%s||%s||%s|%c|||%s^^%s^%s^%s||%s||||%s||%s" + (char) 0xD,
              "JNS" + patient.getId(),
              patient.getLastName() + "^" + patient.getFirstName() + (patient.getMiddleInitial() == null ? "" : "^" + patient.getMiddleInitial()),
              patient.getBirthDate() == null ? "" : String.format("%tY%<tm%<td", patient.getBirthDate()),
              patient.getSex(),
              patient.getAddress(),
              patient.getCity(),
              patient.getState(),
              patient.getZipCode(),
              patient.getHomePhone() == null ? "" : patient.getHomePhone().replaceFirst("\\((\\d{3})\\)", "$1-"),
              patient.getMaritalStatus() == null ? "" : patient.getMaritalStatus().getCode() + "^^HL70002",
              patient.getSsn() == null ? "" : patient.getSsn().replaceAll("-", ""));
      fmt.format("PV1|%s" + (char) 0xD, eventType);
      int index = 1;
      for (PatientInsurance patientInsurance : patient.getInsuranceList()) {
         if ((patientInsurance.getGuarantor() != null) && (patientInsurance.getRelationToGuarantor() != 'S')) {
            Guarantor guarantor = patientInsurance.getGuarantor();
            fmt.format("GT1|1||%s||%s^^%s^%s^%s|%s|%s|%s|%c||%c|%s" + (char) 0xD,
                    guarantor.getLastName() + "^" + guarantor.getFirstName() + (guarantor.getMiddleInitial() == null ? "" : "^" + guarantor.getMiddleInitial()),
                    guarantor.getAddress(),
                    guarantor.getCity(),
                    guarantor.getState(),
                    guarantor.getZipCode(),
                    guarantor.getHomePhone() == null ? "" : guarantor.getHomePhone().replaceFirst("\\((\\d{3})\\)", "$1-"),
                    guarantor.getWorkPhone() == null ? "" : guarantor.getWorkPhone().replaceFirst("\\((\\d{3})\\)", "$1-"),
                    guarantor.getBirthDate() == null ? "" : String.format("%tY%<tm%<td", guarantor.getBirthDate()),
                    guarantor.getSex(),
                    patientInsurance.getRelationToGuarantor() != null ? patientInsurance.getRelationToGuarantor() : 'S',
                    guarantor.getSsn() == null ? "" : guarantor.getSsn().replaceAll("-", ""));
         } else {
            fmt.format("GT1|1||%s||%s^^%s^%s^%s|%s|%s|%s|%c||%c|%s" + (char) 0xD,
                    patient.getLastName() + "^" + patient.getFirstName() + (patient.getMiddleInitial() == null ? "" : "^" + patient.getMiddleInitial()),
                    patient.getAddress(),
                    patient.getCity(),
                    patient.getState(),
                    patient.getZipCode(),
                    patient.getHomePhone() == null ? "" : patient.getHomePhone().replaceFirst("\\((\\d{3})\\)", "$1-"),
                    patient.getWorkPhone() == null ? "" : patient.getWorkPhone().replaceFirst("\\((\\d{3})\\)", "$1-"),
                    patient.getBirthDate() == null ? "" : String.format("%tY%<tm%<td", patient.getBirthDate()),
                    patient.getSex(),
                    'S',
                    patient.getSsn().replaceAll("-", ""));
         }
         fmt.format("IN1|%s|%s|%2$s|||||||||%s|%s||||%c|||||||||||||||||||%s" + (char) 0xD,
                 index++,
                 patientInsurance.getInsurance().getId(),
                 patientInsurance.getEffectiveDate() == null ? "" : String.format("%tY%<tm%<td", patientInsurance.getEffectiveDate()),
                 patientInsurance.getExpirationDate() == null ? "" : String.format("%tY%<tm%<td", patientInsurance.getExpirationDate()),
                 patientInsurance.getRelationToGuarantor() != null ? patientInsurance.getRelationToGuarantor() : 'S',
                 patientInsurance.getMemberId());
      }
      message = fmt.toString() + (char) 0x1C + (char) 0xD;
   }
}
