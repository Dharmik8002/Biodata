import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, OmIcon, FONTS } from './templateUtils';
import { ExportFieldRow } from './ExportFieldRow';

export const ClassicTraditional: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);
  const primaryColor = '#8B1E0F';
  const goldColor = '#C59B27';

  return (
    <div
      className="relative w-full h-full p-8 shadow-sm box-border"
      style={{
        backgroundColor: '#FAF6F0',
        color: '#451a03',
        border: `4px solid ${primaryColor}`,
        fontFamily: FONTS.marcellus,
      }}
    >
      {/* Auspicious header */}
      <div
        className="border-b-2 pb-4 mb-6 text-center"
        style={{ borderColor: primaryColor }}
        data-pdf-section="header"
      >
        <div className="flex items-center justify-center gap-3 mb-1">
          <OmIcon className="w-8 h-8" color={primaryColor} />
        </div>
        {data.religiousHeading && (
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: primaryColor }}
          >
            {data.religiousHeading}
          </p>
        )}
        <h1
          className="text-2xl font-bold tracking-wider uppercase"
          style={{ color: primaryColor, fontFamily: FONTS.cinzel }}
        >
          {data.title || lbl.marriageBiodata}
        </h1>
      </div>

      {/* Top Banner with Photo & Core Summary */}
      <div
        className="flex items-start gap-6 mb-6 pb-6 border-b"
        style={{ borderColor: `${primaryColor}40` }}
        data-pdf-section="profile-banner"
      >
        {data.photoUrl && (
          <div
            className="shrink-0 p-1 bg-white rounded-lg shadow-sm"
            style={{ border: `2px solid ${goldColor}` }}
          >
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className="w-28 h-36 object-cover"
              style={{
                borderRadius: data.photoStyle === 'circle' ? '9999px' : '6px',
              }}
            />
          </div>
        )}

        <div className="flex-1 space-y-1.5 min-w-0">
          <h2
            className="text-2xl font-bold"
            style={{ color: primaryColor, fontFamily: FONTS.playfair }}
          >
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-amber-900/80">"{data.profileHeadline}"</p>
          )}

          <div
            className="pt-2"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '16px',
              rowGap: '4px',
              minWidth: 0,
            }}
          >
            <ExportFieldRow
              label={lbl.dateOfBirth}
              value={data.dateOfBirth ? `${data.dateOfBirth} ${data.age > 0 ? `(${data.age} ${lbl.years})` : ''}` : undefined}
              labelColor={primaryColor}
            />
            <ExportFieldRow label={lbl.height} value={data.heightFeet} labelColor={primaryColor} />
            <ExportFieldRow label={lbl.weight} value={data.weight} labelColor={primaryColor} />
            <ExportFieldRow label={lbl.bloodGroup} value={data.bloodGroup} labelColor={primaryColor} />
            <ExportFieldRow label={lbl.complexion} value={data.complexion} labelColor={primaryColor} />
            <ExportFieldRow
              label={lbl.maritalStatus}
              value={data.maritalStatus ? data.maritalStatus.replace('_', ' ') : undefined}
              labelColor={primaryColor}
            />
            <ExportFieldRow
              label={lbl.religion}
              value={data.religion ? `${data.religion} ${data.caste ? `(${data.caste})` : ''}` : undefined}
              labelColor={primaryColor}
            />
            <ExportFieldRow label={lbl.subCaste} value={data.subCaste} labelColor={primaryColor} />
            <ExportFieldRow label={lbl.motherTongue} value={data.motherTongue} labelColor={primaryColor} />
            <ExportFieldRow
              label={lbl.diet}
              value={data.diet && data.diet !== 'prefer_not_to_disclose' ? data.diet.replace('_', ' ') : undefined}
              labelColor={primaryColor}
            />
            <ExportFieldRow label={lbl.nativePlace} value={data.nativePlace} labelColor={primaryColor} />
            <ExportFieldRow
              label={lbl.currentLocation}
              value={[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}
              labelColor={primaryColor}
              fullWidth
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4 text-xs">
        {/* Education & Career */}
        {(data.highestQualification || data.occupation || data.jobTitle) && (
          <div data-pdf-section="education-career">
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: primaryColor,
                borderColor: `${primaryColor}40`,
                fontFamily: FONTS.cinzel,
              }}
            >
              {lbl.educationCareer}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label={lbl.highestQualification} value={data.highestQualification} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.degree} value={data.degree} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.college} value={data.collegeUniversity} labelColor={primaryColor} />
              <ExportFieldRow label="Addl. Qualifications" value={data.additionalQualifications} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.occupation} value={data.occupation} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.jobTitle} value={data.jobTitle} labelColor={primaryColor} />
              {!data.hideEmployer && (
                <ExportFieldRow label={lbl.company} value={data.companyName} labelColor={primaryColor} />
              )}
              <ExportFieldRow label="Business" value={data.businessDetails} labelColor={primaryColor} />
              {!data.hideIncome && (
                <ExportFieldRow
                  label={lbl.annualIncome}
                  value={data.annualIncome ? `${data.incomeCurrency || 'INR'} ${data.annualIncome}` : undefined}
                  labelColor={primaryColor}
                />
              )}
              <ExportFieldRow label={lbl.workLocation} value={data.workLocation} labelColor={primaryColor} />
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName || data.fatherOccupation || data.motherOccupation || data.brothersCount > 0 || data.sistersCount > 0 || data.brothersDetails || data.sistersDetails || data.familyType || data.familyStatus || data.familyValues || data.familyNativePlace || data.familyResidence || data.familyIntroduction || (data.additionalFamilyMembers && data.additionalFamilyMembers.length > 0)) && (
          <div data-pdf-section="family-details">
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: primaryColor,
                borderColor: `${primaryColor}40`,
                fontFamily: FONTS.cinzel,
              }}
            >
              {lbl.familyDetails}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow
                label={lbl.fatherName}
                value={data.fatherName ? `${data.fatherName} ${data.fatherOccupation ? `(${data.fatherOccupation})` : ''}` : undefined}
                labelColor={primaryColor}
              />
              <ExportFieldRow
                label={lbl.motherName}
                value={data.motherName ? `${data.motherName} ${data.motherOccupation ? `(${data.motherOccupation})` : ''}` : undefined}
                labelColor={primaryColor}
              />
              {(data.brothersCount > 0 || data.brothersDetails) && (
                <ExportFieldRow
                  label={lbl.brothers}
                  value={`${data.brothersCount || 0} ${data.brothersDetails ? `— ${data.brothersDetails}` : ''}`}
                  labelColor={primaryColor}
                />
              )}
              {(data.sistersCount > 0 || data.sistersDetails) && (
                <ExportFieldRow
                  label={lbl.sisters}
                  value={`${data.sistersCount || 0} ${data.sistersDetails ? `— ${data.sistersDetails}` : ''}`}
                  labelColor={primaryColor}
                />
              )}
              <ExportFieldRow
                label={lbl.familyType}
                value={data.familyType === 'nuclear' ? 'Nuclear' : data.familyType === 'joint' ? 'Joint' : data.familyType ? 'Other' : undefined}
                labelColor={primaryColor}
              />
              <ExportFieldRow label={lbl.familyStatus || 'Family Status'} value={data.familyStatus} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.familyValues} value={data.familyValues} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.familyNative} value={data.familyNativePlace} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.familyResidence} value={data.familyResidence} labelColor={primaryColor} fullWidth />
            </div>

            {data.familyIntroduction && (
              <p className="mt-2 text-amber-950/90 leading-relaxed italic">
                "{data.familyIntroduction}"
              </p>
            )}

            {data.additionalFamilyMembers?.length > 0 && (
              <div className="mt-2 border-t border-amber-900/20 pt-1.5 space-y-1">
                {data.additionalFamilyMembers.map((m) => (
                  <div key={m.id} className="text-amber-950">
                    <span className="font-semibold text-[#8B1E0F]">{m.relation}:</span> {m.name} {m.details ? `(${m.details})` : ''}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Horoscope Section (If Enabled) */}
        {data.includeHoroscope && (
          <div data-pdf-section="horoscope-details">
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: primaryColor,
                borderColor: `${primaryColor}40`,
                fontFamily: FONTS.cinzel,
              }}
            >
              {lbl.horoscopeDetails}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label={lbl.timeOfBirth} value={data.timeOfBirth} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.placeOfBirth} value={data.placeOfBirth} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.rashi} value={data.rashi} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.nakshatra} value={data.nakshatra} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.gotra} value={data.gotra} labelColor={primaryColor} />
              <ExportFieldRow
                label={lbl.manglik}
                value={
                  data.manglikStatus === 'no'
                    ? 'Non-Manglik'
                    : data.manglikStatus === 'yes'
                    ? 'Manglik'
                    : data.manglikStatus === 'partial'
                    ? 'Anshik / Partial'
                    : undefined
                }
                labelColor={primaryColor}
              />
              <ExportFieldRow label={lbl.kundaliNotes} value={data.horoscopeNotes} labelColor={primaryColor} fullWidth />
            </div>
          </div>
        )}

        {/* About Me & Lifestyle */}
        {(data.aboutMe || (data.hobbies && data.hobbies.length > 0) || data.personality || data.lifestyle || (data.languagesKnown && data.languagesKnown.length > 0)) && (
          <div data-pdf-section="about-me">
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: primaryColor,
                borderColor: `${primaryColor}40`,
                fontFamily: FONTS.cinzel,
              }}
            >
              {lbl.aboutMe}
            </h3>
            {data.aboutMe && (
              <p className="text-amber-950 leading-relaxed whitespace-pre-line mb-2">
                {data.aboutMe}
              </p>
            )}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label="Personality" value={data.personality} labelColor={primaryColor} />
              <ExportFieldRow label="Lifestyle" value={data.lifestyle} labelColor={primaryColor} />
              {data.hobbies && data.hobbies.length > 0 && (
                <ExportFieldRow label={lbl.hobbies} value={data.hobbies.join(', ')} labelColor={primaryColor} fullWidth />
              )}
              {data.languagesKnown && data.languagesKnown.length > 0 && (
                <ExportFieldRow label={lbl.languagesKnown} value={data.languagesKnown.join(', ')} labelColor={primaryColor} fullWidth />
              )}
            </div>
          </div>
        )}

        {/* Partner Preferences (If Enabled) */}
        {data.includePartnerPreferences && (
          <div data-pdf-section="partner-preferences">
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: primaryColor,
                borderColor: `${primaryColor}40`,
                fontFamily: FONTS.cinzel,
              }}
            >
              {lbl.partnerPreferences}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                minWidth: 0,
              }}
            >
              {(data.partnerAgeMin || data.partnerAgeMax) && (
                <ExportFieldRow
                  label={lbl.prefAge}
                  value={`${data.partnerAgeMin || 18} - ${data.partnerAgeMax || 40} ${lbl.years}`}
                  labelColor={primaryColor}
                />
              )}
              <ExportFieldRow label={lbl.prefHeight} value={data.partnerHeightRange} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.prefEducation} value={data.partnerEducation} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.prefProfession} value={data.partnerProfession} labelColor={primaryColor} />
              <ExportFieldRow label={lbl.prefLocation} value={data.partnerLocation} labelColor={primaryColor} />
              <ExportFieldRow label="Mother Tongue" value={data.partnerMotherTongue} labelColor={primaryColor} />
              <ExportFieldRow label="Community" value={data.partnerCommunity} labelColor={primaryColor} />
              <ExportFieldRow label="Diet" value={data.partnerDiet} labelColor={primaryColor} />
            </div>
            {data.partnerExpectations && (
              <p className="mt-2 text-amber-950/90 italic">"{data.partnerExpectations}"</p>
            )}
          </div>
        )}

        {/* Contact Details (With Visibility Controls) */}
        {(data.contactPersonName || (data.showPhone && data.primaryPhone) || (data.showEmail && data.email) || (data.showAddress && data.residentialAddress)) && (
          <div data-pdf-section="contact-details">
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: primaryColor,
                borderColor: `${primaryColor}40`,
                fontFamily: FONTS.cinzel,
              }}
            >
              {lbl.contactDetails}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow
                label={lbl.contactPerson}
                value={data.contactPersonName ? `${data.contactPersonName} ${data.relationship ? `(${data.relationship})` : ''}` : undefined}
                labelColor={primaryColor}
              />
              {data.showPhone && data.primaryPhone && (
                <ExportFieldRow
                  label={lbl.phone}
                  value={`${data.primaryPhone} ${data.alternatePhone ? `/ ${data.alternatePhone}` : ''}`}
                  labelColor={primaryColor}
                />
              )}
              {data.showEmail && data.email && (
                <ExportFieldRow label={lbl.email} value={data.email} labelColor={primaryColor} />
              )}
              {data.showAddress && data.residentialAddress && (
                <ExportFieldRow label={lbl.address} value={data.residentialAddress} labelColor={primaryColor} fullWidth />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
