unit TransportationFormRpt;

interface

uses Windows, SysUtils, Messages, Classes, Graphics, Controls,
  StdCtrls, ExtCtrls, Forms, QuickRpt, QRCtrls, TransportationForm2Rpt;

type
  TTransportationFormRep = class(TQuickRep)
    TitleBand: TQRBand;
    Problem1Lbl: TQRLabel;
    QRShape3: TQRShape;
    QRLabel13: TQRLabel;
    QRLabel14: TQRLabel;
    QRLabel15: TQRLabel;
    QRDBText4: TQRDBText;
    QRLabel16: TQRLabel;
    QRDBText5: TQRDBText;
    QRDBText6: TQRDBText;
    QRLabel17: TQRLabel;
    QRDBText7: TQRDBText;
    QRLabel18: TQRLabel;
    QRDBText8: TQRDBText;
    QRLabel8: TQRLabel;
    QRLabel1: TQRLabel;
    QRLabel2: TQRLabel;
    QRShape1: TQRShape;
    QRLabel5: TQRLabel;
    QRShape2: TQRShape;
    QRDBText1: TQRDBText;
    QRLabel6: TQRLabel;
    QRLabel7: TQRLabel;
    QRShape4: TQRShape;
    QRShape5: TQRShape;
    QRLabel9: TQRLabel;
    QRLabel10: TQRLabel;
    QRLabel11: TQRLabel;
    QRLabel12: TQRLabel;
    QRLabel19: TQRLabel;
    QRLabel20: TQRLabel;
    UseWheelchairYes: TQRShape;
    QRLabel21: TQRLabel;
    QRShape9: TQRShape;
    QRLabel22: TQRLabel;
    QRLabel23: TQRLabel;
    QRLabel24: TQRLabel;
    QRLabel25: TQRLabel;
    QRLabel26: TQRLabel;
    QRLabel27: TQRLabel;
    QRLabel28: TQRLabel;
    QRLabel29: TQRLabel;
    QRLabel30: TQRLabel;
    QRLabel31: TQRLabel;
    QRLabel32: TQRLabel;
    QRLabel33: TQRLabel;
    QRLabel34: TQRLabel;
    QRLabel35: TQRLabel;
    QRLabel36: TQRLabel;
    QRLabel37: TQRLabel;
    QRLabel38: TQRLabel;
    QRLabel39: TQRLabel;
    QRLabel40: TQRLabel;
    QRLabel41: TQRLabel;
    Problem2Lbl: TQRLabel;
    Problem3Lbl: TQRLabel;
    Problem4Lbl: TQRLabel;
    Problem5Lbl: TQRLabel;
    Problem6Lbl: TQRLabel;
    UseWheelchairNo: TQRShape;
    QRLabel3: TQRLabel;
    QRLabel4: TQRLabel;
    PersonalAssistanceYes: TQRShape;
    QRLabel42: TQRLabel;
    PersonalAssistanceNo: TQRShape;
    QRLabel43: TQRLabel;
    TravelPointWithinCMMAYes: TQRShape;
    QRLabel44: TQRLabel;
    TravelPointWithinCMMANo: TQRShape;
    QRLabel45: TQRLabel;
    SomebodyTravelingYes: TQRShape;
    QRLabel46: TQRLabel;
    SomebodyTravelingNo: TQRShape;
    QRLabel47: TQRLabel;
    LifeSustainingEquipmentYes: TQRShape;
    QRLabel48: TQRLabel;
    LifeSustainingEquipmentNo: TQRShape;
    QRLabel49: TQRLabel;
    QRLabel50: TQRLabel;
    RequireMonitoringNo: TQRShape;
    RequireMonitoringYes: TQRShape;
    QRLabel51: TQRLabel;
    RecliningMedicalReasonYes: TQRShape;
    QRLabel52: TQRLabel;
    RecliningMedicalReasonNo: TQRShape;
    QRLabel53: TQRLabel;
    RecliningPsychiatricYes: TQRShape;
    QRLabel54: TQRLabel;
    RecliningPsychiatricNo: TQRShape;
    QRLabel55: TQRLabel;
    RequireVehicleOxygenYes: TQRShape;
    QRLabel56: TQRLabel;
    RequireVehicleOxygenNo: TQRShape;
    QRLabel57: TQRLabel;
    TravelWithinCMMAYes: TQRShape;
    Livery: TQRShape;
    TravelWithinCMMANo: TQRShape;
    Ambulette: TQRShape;
    NonEmergencyAmbulance: TQRShape;
    CompositeReport: TQRCompositeReport;
    QRDBText2: TQRDBText;
    QRDBText3: TQRDBText;
    UseWheelchairYesLbl: TQRLabel;
    UseWheelchairNoLbl: TQRLabel;
    PersonalAssistanceNoLbl: TQRLabel;
    PersonalAssistanceYesLbl: TQRLabel;
    TravelPointWithinCMMANoLbl: TQRLabel;
    TravelPointWithinCMMAYesLbl: TQRLabel;
    SomebodyTravelingYesLbl: TQRLabel;
    SomebodyTravelingNoLbl: TQRLabel;
    RequireMonitoringNoLbl: TQRLabel;
    RequireMonitoringYesLbl: TQRLabel;
    LifeSustainingEquipmentYesLbl: TQRLabel;
    LifeSustainingEquipmentNoLbl: TQRLabel;
    RequireVehicleOxygenYesLbl: TQRLabel;
    RequireVehicleOxygenNoLbl: TQRLabel;
    RecliningPsychiatricYesLbl: TQRLabel;
    RecliningPsychiatricNoLbl: TQRLabel;
    RecliningMedicalReasonNoLbl: TQRLabel;
    RecliningMedicalReasonYesLbl: TQRLabel;
    AmbuletteLbl: TQRLabel;
    TravelWithinCMMANoLbl: TQRLabel;
    TravelWithinCMMAYesLbl: TQRLabel;
    LiveryLbl: TQRLabel;
    NonEmergencyAmbulanceLbl: TQRLabel;
    QRDBText10: TQRDBText;
    MedicaidNoLbl: TQRLabel;
    QRLabel58: TQRLabel;
    QRLabel59: TQRLabel;
    QRLabel60: TQRLabel;
    QRLabel61: TQRLabel;
    QRLabel62: TQRLabel;
    QRLabel63: TQRLabel;
    RequireAmbuletteLbl: TQRLabel;
    QRDBText9: TQRDBText;
    procedure CompositeReportAddReports(Sender: TObject);
  private
    BackSideRpt: TTransportationForm2Rep;
  public
    procedure ExecRpt(AOfficeID, APatientID: Integer);
  end;

var
  TransportationFormRep: TTransportationFormRep;

implementation

{$R *.DFM}

uses
  CompanyDataMod, ProviderDataMod, PatientDataMod, RptDataMod;

procedure TTransportationFormRep.ExecRpt(AOfficeID, APatientID: Integer);
var
  i, t: byte;
  s: string;
  lbl: TQRLabel;
  IsAmbulette: boolean;
begin
  BackSideRpt := TTransportationForm2Rep.Create(self);
  with CompanyData, ProviderData, PatientData, RptData do
  begin
    PatientInfo.Close;
    PatientInfo.ParamByName('@PatientID').Value := APatientID;
    PatientInfo.Prepare;
    PatientInfo.Open;

    CompanySiteInfo.Close;
    CompanySiteInfo.ParamByName('@OfficeID').Value := AOfficeID;
    CompanySiteInfo.Prepare;
    CompanySiteInfo.Open;
    BackSideRpt.OfficeAddressLbl.Caption := CompanySiteInfoAddress.Value + ' ' +
      CompanySiteInfoCityStateZip.Value;

    InsurByPatient.Close;
    InsurByPatient.ParamByName('@PatientID').Value := APatientID;
    InsurByPatient.Prepare;
    InsurByPatient.Open;
    MedicaidNoLbl.Caption := '';
    while not InsurByPatient.EOF do
    begin
      if (InsurByPatientInsuranceID.Value = 62) and
        not(InsurByPatientPolicyID.IsNull) then
        MedicaidNoLbl.Caption := InsurByPatientPolicyID.Value;
      InsurByPatient.Next;
    end;
    InsurByPatient.Close;

    PatTransCondition.Close;
    PatTransCondition.ParamByName('@PatientID').Value := APatientID;
    PatTransCondition.Prepare;
    PatTransCondition.Open;
    PatTransForm.Close;
    PatTransForm.ParamByName('@PatientID').Value := APatientID;
    PatTransForm.Prepare;
    PatTransForm.Open;

    S := ''; i := 1;
    if not PatTransFormDiagnosis.IsNull then
    begin
    S := PatTransFormDiagnosis.Value;
    while Pos(';', S) > 0 do
    begin
      t := Pos(';', S);
      lbl := TQRLabel(TitleBand.FindChildControl('Problem'+IntToStr(i)+'Lbl'));
      lbl.Caption := copy(S, 1, t-1);
      lbl.Enabled := true;
      Inc(i);
      if i > 6 then break;
      Delete(S, 1, t);
    end;
    if (S <> '') and (i <= 6) then begin
      lbl := TQRLabel(TitleBand.FindChildControl('Problem'+IntToStr(i)+'Lbl'));
      lbl.Caption := S;
      lbl.Enabled := true;
    end;
    end;
    IsAmbulette := false;
    while not PatTransCondition.EOF do begin
      if not IsAmbulette then
        IsAmbulette := (PatTransConditionConditionType.Value and 4) > 0;
      PatTransCondition.Next;
    end;
    if not IsAmbulette then
      IsAmbulette := PatTransFormUseWheelchairScooterOxygen.Value;
    UseWheelchairYesLbl.Enabled := PatTransFormUseWheelchairScooterOxygen.Value;
    UseWheelchairNoLbl.Enabled := not(PatTransFormUseWheelchairScooterOxygen.Value);
    PersonalAssistanceYesLbl.Enabled := PatTransFormPersonalAssistanceToEnter.Value;
    PersonalAssistanceNoLbl.Enabled := not(PatTransFormPersonalAssistanceToEnter.Value);
    SomebodyTravelingYesLbl.Enabled := PatTransFormSomeBodyTravelingWith.Value;
    SomebodyTravelingNoLbl.Enabled := not(PatTransFormSomeBodyTravelingWith.Value);
    TravelPointWithinCMMAYesLbl.Enabled := PatTransFormTravelPointWithinCMMA.Value;
    TravelPointWithinCMMANoLbl.Enabled := not(PatTransFormTravelPointWithinCMMA.Value);
    LifeSustainingEquipmentYesLbl.Enabled := PatTransFormRequireLifeSustainingEquipment.Value;
    LifeSustainingEquipmentNoLbl.Enabled := not(PatTransFormRequireLifeSustainingEquipment.Value);
    RequireMonitoringYesLbl.Enabled := PatTransFormRequireMonitoring.Value;
    RequireMonitoringNoLbl.Enabled := not(PatTransFormRequireMonitoring.Value);
    RecliningMedicalReasonYesLbl.Enabled := PatTransFormRecliningPositionMedicalReason.Value;
    RecliningMedicalReasonNoLbl.Enabled := not(PatTransFormRecliningPositionMedicalReason.Value);
    RecliningPsychiatricYesLbl.Enabled := PatTransFormRecliningPositionPsychiatricCon.Value;
    RecliningPsychiatricNoLbl.Enabled := not(PatTransFormRecliningPositionPsychiatricCon.Value);
    RequireVehicleOxygenYesLbl.Enabled := PatTransFormRequireVehicleOxygen.Value;
    RequireVehicleOxygenNoLbl.Enabled := not(PatTransFormRequireVehicleOxygen.Value);
    TravelWithinCMMAYesLbl.Enabled := PatTransFormTravelWithinCMMA.Value;
    TravelWithinCMMANoLbl.Enabled := not(PatTransFormTravelWithinCMMA.Value);

    RequireAmbuletteLbl.Enabled := IsAmbulette;

    case PatTransFormTransportationTypeID.Value of
      1: AmbuletteLbl.Enabled := true;
      2: LiveryLbl.Enabled := true;
      4: NonEmergencyAmbulanceLbl.Enabled := true;
    end;
    ProviderInfo.Close;
    ProviderInfo.ParamByName('@ProviderID').Value := PatTransFormProviderID.Value;
    ProviderInfo.Prepare;
    ProviderInfo.Open;

    CompositeReport.Preview;

    ProviderInfo.Close;
    PatTransForm.Close;
    PatTransCondition.Close;
    CompanySiteInfo.Close;
    PatientInfo.Close;
  end;
  BackSideRpt.Free
end;

procedure TTransportationFormRep.CompositeReportAddReports(Sender: TObject);
begin
  with CompositeReport.Reports do
  begin
    Add(self);
    Add(BackSideRpt);
  end;
end;

end.
