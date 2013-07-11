CREATE DEFINER=`root`@`%` PROCEDURE `getAssignedOfficeProviderId`(
  IN officeProviderId INT, IN specialtyId INT, IN insuranceId INT,
  IN primaryCarePhysicianId INT)
BEGIN
  DECLARE insuranceCount TINYINT;
  DECLARE planType VARCHAR(2);
  DECLARE assignedNpi VARCHAR(10);
  DECLARE assignedProviderId INT;

  SET assignedProviderId = officeProviderId;

  SELECT associated_office_provider_id FROM office_provider o
    WHERE o.id = officeProviderId AND associated_office_provider_id IS NOT NULL
  INTO assignedProviderId;
  SELECT plan_type FROM insurance
    WHERE id = insuranceId
    INTO planType;

  IF specialtyId = 1 AND planType = "HM" AND (primaryCarePhysicianId IS NOT NULL) THEN
    SET assignedProviderId = primaryCarePhysicianId;
  END IF;

  SELECT associated_npi FROM office_provider
    WHERE id = assignedProviderId
    INTO assignedNpi;

	IF  NOT(insuranceId IS NULL OR  insuranceId = 0) THEN

	 SELECT COUNT(*) FROM provider_insurance
	    WHERE provider_npi = assignedNpi AND insurance_id = insuranceId
	    INTO insuranceCount;

	  IF insuranceCount = 0 THEN
	    SELECT provider.npi FROM provider
	    LEFT JOIN provider_insurance ON (provider.npi = provider_insurance.provider_npi)
	    WHERE (provider.active = 1) AND (provider_insurance.insurance_id = insuranceId)
	    AND (provider.specialty_id = specialtyId)
	    ORDER BY RAND(officeProviderId) LIMIT 1
	    INTO assignedNpi;
	    IF assignedNpi IS NULL THEN SET assignedProviderId = 0;
	    ELSE SELECT id FROM office_provider WHERE associated_npi = assignedNpi AND role = "self"
	    INTO assignedProviderId;
	    END IF;
	  END IF;

	END IF;

  SELECT assignedNpi, assignedProviderId;  
END