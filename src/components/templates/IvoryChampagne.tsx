import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, GoldDivider, FONTS } from './templateUtils';
import { ExportFieldRow } from './ExportFieldRow';

export const IvoryChampagne: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);
  const goldBorder = '#D4AF37';
  const amberHeading = '#78350F';
  const amberSub = '#B45309';

  return (
    <div
      className="relative w-full h-full p-8 shadow-sm box-border overflow-hidden"
      style={{
        backgroundColor: '#FFFDF8',
        color: '#451a03',
        border: `6px solid ${goldBorder}cc`,
        fontFamily: FONTS.sans,
      }}
    >
      {/* Embossed inner border */}
      <div className="absolute inset-2 border-2 border-[#D4AF37]/30 pointer-events-none" />

      {/* Header */}
      <div className="text-center relative z-10 mb-6" data-pdf-section="header">
        {data.religiousHeading && (
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: amberSub, fontFamily: FONTS.marcellus }}
          >
            {data.religiousHeading}
          </p>
        )}
        <h1
          className="text-2xl font-bold uppercase tracking-widest"
          style={{ color: amberHeading, fontFamily: FONTS.cinzel }}
        >
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color={goldBorder} />
      </div>

      {/* Top Banner / Personal Profile */}
      <div
        className="flex items-start gap-6 p-5 rounded-lg mb-6 shadow-xs relative z-10"
        style={{
          backgroundColor: '#FEF9EE',
          border: `1px solid ${goldBorder}60`,
        }}
        data-pdf-section="profile-banner"
      >
        {data.photoUrl && (
          <div
            className="shrink-0 p-1 bg-white rounded-lg shadow-sm"
            style={{ border: `2px solid ${goldBorder}` }}
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
            className="text-2xl font-bold tracking-wide"
            style={{ color: amberHeading, fontFamily: FONTS.playfair }}
          >
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic" style={{ color: amberSub }}>
              "{data.profileHeadline}"
            </p>
          )}

          <div
            className="pt-2 border-t"
            style={{
              borderColor: `${goldBorder}50`,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '16px',
              rowGap: '4px',
              minWidth: 0,
            }}
          >
            <ExportFieldRow
              label={lbl.dateOfBirth}
              value={data.dateOfBirth ? `${data.dateOfBirth} ${data.age > 0 ? `(${data.age} yrs)` : ''}` : undefined}
              labelColor={amberHeading}
            />
            <ExportFieldRow label={lbl.height} value={data.heightFeet} labelColor={amberHeading} />
            <ExportFieldRow label={lbl.weight} value={data.weight} labelColor={amberHeading} />
            <ExportFieldRow label={lbl.bloodGroup} value={data.bloodGroup} labelColor={amberHeading} />
            <ExportFieldRow label={lbl.complexion} value={data.complexion} labelColor={amberHeading} />
            <ExportFieldRow
              label={lbl.maritalStatus}
              value={data.maritalStatus ? data.maritalStatus.replace('_', ' ') : undefined}
              labelColor={amberHeading}
            />
            <ExportFieldRow
              label={lbl.religion}
              value={data.religion ? `${data.religion} ${data.caste ? `(${data.caste})` : ''}` : undefined}
              labelColor={amberHeading}
            />
            <ExportFieldRow label={lbl.subCaste} value={data.subCaste} labelColor={amberHeading} />
            <ExportFieldRow label={lbl.motherTongue} value={data.motherTongue} labelColor={amberHeading} />
            <ExportFieldRow
              label={lbl.diet}
              value={data.diet && data.diet !== 'prefer_not_to_disclose' ? data.diet.replace('_', ' ') : undefined}
              labelColor={amberHeading}
            />
            <ExportFieldRow label={lbl.nativePlace} value={data.nativePlace} labelColor={amberHeading} />
            <ExportFieldRow
              label={lbl.currentLocation}
              value={[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}
              labelColor={amberHeading}
              fullWidth
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4 text-xs relative z-10">
        {/* Education & Career */}
        {(data.highestQualification || data.occupation || data.jobTitle) && (
          <div data-pdf-section="education-career">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1"
              style={{
                backgroundColor: '#FEF9EE',
                borderLeft: `4px solid ${goldBorder}`,
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase" style={{ color: amberHeading }}>
                {lbl.educationCareer}
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                paddingLeft: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label={lbl.highestQualification} value={data.highestQualification} labelColor="#78350F" />
              <ExportFieldRow label={lbl.degree} value={data.degree} labelColor="#78350F" />
              <ExportFieldRow label={lbl.college} value={data.collegeUniversity} labelColor="#78350F" />
              <ExportFieldRow label="Addl. Qualifications" value={data.additionalQualifications} labelColor="#78350F" />
              <ExportFieldRow label={lbl.occupation} value={data.occupation} labelColor="#78350F" />
              <ExportFieldRow label={lbl.jobTitle} value={data.jobTitle} labelColor="#78350F" />
              {!data.hideEmployer && (
                <ExportFieldRow label={lbl.company} value={data.companyName} labelColor="#78350F" />
              )}
              <ExportFieldRow label="Business" value={data.businessDetails} labelColor="#78350F" />
              {!data.hideIncome && (
                <ExportFieldRow
                  label={lbl.annualIncome}
                  value={data.annualIncome ? `${data.incomeCurrency || 'INR'} ${data.annualIncome}` : undefined}
                  labelColor="#78350F"
                />
              )}
              <ExportFieldRow label={lbl.workLocation} value={data.workLocation} labelColor="#78350F" />
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName || data.fatherOccupation || data.motherOccupation || data.brothersCount > 0 || data.sistersCount > 0 || data.brothersDetails || data.sistersDetails || data.familyType || data.familyStatus || data.familyValues || data.familyNativePlace || data.familyResidence || data.familyIntroduction || (data.additionalFamilyMembers && data.additionalFamilyMembers.length > 0)) && (
          <div data-pdf-section="family-details">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1"
              style={{
                backgroundColor: '#FEF9EE',
                borderLeft: `4px solid ${goldBorder}`,
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase" style={{ color: amberHeading }}>
                {lbl.familyDetails}
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                paddingLeft: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow
                label={lbl.fatherName}
                value={data.fatherName ? `${data.fatherName} ${data.fatherOccupation ? `(${data.fatherOccupation})` : ''}` : undefined}
                labelColor="#78350F"
              />
              <ExportFieldRow
                label={lbl.motherName}
                value={data.motherName ? `${data.motherName} ${data.motherOccupation ? `(${data.motherOccupation})` : ''}` : undefined}
                labelColor="#78350F"
              />
              {(data.brothersCount > 0 || data.brothersDetails) && (
                <ExportFieldRow
                  label={lbl.brothers}
                  value={`${data.brothersCount || 0} ${data.brothersDetails ? `— ${data.brothersDetails}` : ''}`}
                  labelColor="#78350F"
                />
              )}
              {(data.sistersCount > 0 || data.sistersDetails) && (
                <ExportFieldRow
                  label={lbl.sisters}
                  value={`${data.sistersCount || 0} ${data.sistersDetails ? `— ${data.sistersDetails}` : ''}`}
                  labelColor="#78350F"
                />
              )}
              <ExportFieldRow
                label={lbl.familyType}
                value={data.familyType === 'nuclear' ? 'Nuclear' : data.familyType === 'joint' ? 'Joint' : data.familyType ? 'Other' : undefined}
                labelColor="#78350F"
              />
              <ExportFieldRow label={lbl.familyStatus || 'Family Status'} value={data.familyStatus} labelColor="#78350F" />
              <ExportFieldRow label={lbl.familyValues} value={data.familyValues} labelColor="#78350F" />
              <ExportFieldRow label={lbl.familyNative} value={data.familyNativePlace} labelColor="#78350F" />
              <ExportFieldRow label={lbl.familyResidence} value={data.familyResidence} labelColor="#78350F" fullWidth />
            </div>

            {data.familyIntroduction && (
              <p className="mt-2 text-amber-950 leading-relaxed italic">
                "{data.familyIntroduction}"
              </p>
            )}

            {data.additionalFamilyMembers?.length > 0 && (
              <div className="mt-2 border-t border-[#D4AF37]/30 pt-1.5 space-y-1">
                {data.additionalFamilyMembers.map((m) => (
                  <div key={m.id} className="text-amber-950">
                    <span className="font-semibold text-amber-900">{m.relation}:</span> {m.name} {m.details ? `(${m.details})` : ''}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Horoscope (Optional) */}
        {data.includeHoroscope && (
          <div data-pdf-section="horoscope-details">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1"
              style={{
                backgroundColor: '#FEF9EE',
                borderLeft: `4px solid ${goldBorder}`,
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase" style={{ color: amberHeading }}>
                {lbl.horoscopeDetails}
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                paddingLeft: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label={lbl.timeOfBirth} value={data.timeOfBirth} labelColor="#78350F" />
              <ExportFieldRow label={lbl.placeOfBirth} value={data.placeOfBirth} labelColor="#78350F" />
              <ExportFieldRow label={lbl.rashi} value={data.rashi} labelColor="#78350F" />
              <ExportFieldRow label={lbl.nakshatra} value={data.nakshatra} labelColor="#78350F" />
              <ExportFieldRow label={lbl.gotra} value={data.gotra} labelColor="#78350F" />
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
                labelColor="#78350F"
              />
              <ExportFieldRow label={lbl.kundaliNotes} value={data.horoscopeNotes} labelColor="#78350F" fullWidth />
            </div>
          </div>
        )}

        {/* About Me */}
        {(data.aboutMe || (data.hobbies && data.hobbies.length > 0) || data.personality || data.lifestyle || (data.languagesKnown && data.languagesKnown.length > 0)) && (
          <div data-pdf-section="about-me">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1"
              style={{
                backgroundColor: '#FEF9EE',
                borderLeft: `4px solid ${goldBorder}`,
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase" style={{ color: amberHeading }}>
                {lbl.aboutMe}
              </span>
            </div>
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
                paddingLeft: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label="Personality" value={data.personality} labelColor="#78350F" />
              <ExportFieldRow label="Lifestyle" value={data.lifestyle} labelColor="#78350F" />
              {data.hobbies && data.hobbies.length > 0 && (
                <ExportFieldRow label={lbl.hobbies} value={data.hobbies.join(', ')} labelColor="#78350F" fullWidth />
              )}
              {data.languagesKnown && data.languagesKnown.length > 0 && (
                <ExportFieldRow label={lbl.languagesKnown} value={data.languagesKnown.join(', ')} labelColor="#78350F" fullWidth />
              )}
            </div>
          </div>
        )}

        {/* Partner Preferences (Optional) */}
        {data.includePartnerPreferences && (
          <div data-pdf-section="partner-preferences">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1"
              style={{
                backgroundColor: '#FEF9EE',
                borderLeft: `4px solid ${goldBorder}`,
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase" style={{ color: amberHeading }}>
                {lbl.partnerPreferences}
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                paddingLeft: '6px',
                minWidth: 0,
              }}
            >
              {(data.partnerAgeMin || data.partnerAgeMax) && (
                <ExportFieldRow
                  label={lbl.prefAge}
                  value={`${data.partnerAgeMin || 18} - ${data.partnerAgeMax || 40} ${lbl.years}`}
                  labelColor="#78350F"
                />
              )}
              <ExportFieldRow label={lbl.prefHeight} value={data.partnerHeightRange} labelColor="#78350F" />
              <ExportFieldRow label={lbl.prefEducation} value={data.partnerEducation} labelColor="#78350F" />
              <ExportFieldRow label={lbl.prefProfession} value={data.partnerProfession} labelColor="#78350F" />
              <ExportFieldRow label={lbl.prefLocation} value={data.partnerLocation} labelColor="#78350F" />
              <ExportFieldRow label="Mother Tongue" value={data.partnerMotherTongue} labelColor="#78350F" />
              <ExportFieldRow label="Community" value={data.partnerCommunity} labelColor="#78350F" />
              <ExportFieldRow label="Diet" value={data.partnerDiet} labelColor="#78350F" />
            </div>
            {data.partnerExpectations && (
              <p className="mt-2 text-amber-900 italic">"{data.partnerExpectations}"</p>
            )}
          </div>
        )}

        {/* Contact Details */}
        {(data.contactPersonName || (data.showPhone && data.primaryPhone) || (data.showEmail && data.email) || (data.showAddress && data.residentialAddress)) && (
          <div data-pdf-section="contact-details">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1"
              style={{
                backgroundColor: '#FEF9EE',
                borderLeft: `4px solid ${goldBorder}`,
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase" style={{ color: amberHeading }}>
                {lbl.contactDetails}
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                paddingLeft: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow
                label={lbl.contactPerson}
                value={data.contactPersonName ? `${data.contactPersonName} ${data.relationship ? `(${data.relationship})` : ''}` : undefined}
                labelColor="#78350F"
              />
              {data.showPhone && data.primaryPhone && (
                <ExportFieldRow
                  label={lbl.phone}
                  value={`${data.primaryPhone} ${data.alternatePhone ? `/ ${data.alternatePhone}` : ''}`}
                  labelColor="#78350F"
                />
              )}
              {data.showEmail && data.email && (
                <ExportFieldRow label={lbl.email} value={data.email} labelColor="#78350F" />
              )}
              {data.showAddress && data.residentialAddress && (
                <ExportFieldRow label={lbl.address} value={data.residentialAddress} labelColor="#78350F" fullWidth />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
