import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, GoldDivider, FONTS } from './templateUtils';
import { ExportFieldRow } from './ExportFieldRow';

export const RoyalBlueGold: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);
  const navyColor = '#0F274E';
  const goldColor = '#D4AF37';

  return (
    <div
      className="relative w-full h-full p-8 shadow-sm box-border overflow-hidden"
      style={{
        backgroundColor: '#FAFBFD',
        color: '#1e293b',
        border: `5px solid ${navyColor}`,
        fontFamily: FONTS.sans,
      }}
    >
      {/* Inner Accent Gold Border */}
      <div className="absolute inset-1.5 border border-[#D4AF37] pointer-events-none" />

      {/* Royal Navy Header Bar */}
      <div
        className="p-5 rounded-lg mb-6 text-center shadow-sm"
        style={{
          backgroundColor: navyColor,
          border: `2px solid ${goldColor}`,
          color: '#ffffff',
        }}
        data-pdf-section="header"
      >
        {data.religiousHeading && (
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-1"
            style={{ color: goldColor, fontFamily: FONTS.marcellus }}
          >
            {data.religiousHeading}
          </p>
        )}
        <h1
          className="text-2xl font-bold uppercase tracking-widest"
          style={{ color: '#FEF3C7', fontFamily: FONTS.cinzel }}
        >
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color={goldColor} />
      </div>

      {/* Profile Overview (Photo + Core Details) */}
      <div
        className="flex items-start gap-6 p-5 rounded-lg mb-6 shadow-xs"
        style={{
          backgroundColor: '#ffffff',
          border: `1px solid ${goldColor}80`,
        }}
        data-pdf-section="profile-banner"
      >
        {data.photoUrl && (
          <div
            className="shrink-0 p-1 rounded-xl"
            style={{
              backgroundColor: navyColor,
              border: `2px solid ${goldColor}`,
            }}
          >
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className="w-28 h-36 object-cover"
              style={{
                borderRadius: data.photoStyle === 'circle' ? '9999px' : '8px',
              }}
            />
          </div>
        )}

        <div className="flex-1 space-y-1.5 min-w-0">
          <h2
            className="text-2xl font-bold tracking-wide"
            style={{ color: navyColor, fontFamily: FONTS.playfair }}
          >
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-slate-600 font-medium">"{data.profileHeadline}"</p>
          )}

          <div
            className="pt-2 border-t"
            style={{
              borderColor: `${goldColor}50`,
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
              labelColor={navyColor}
            />
            <ExportFieldRow label={lbl.height} value={data.heightFeet} labelColor={navyColor} />
            <ExportFieldRow label={lbl.weight} value={data.weight} labelColor={navyColor} />
            <ExportFieldRow label={lbl.bloodGroup} value={data.bloodGroup} labelColor={navyColor} />
            <ExportFieldRow label={lbl.complexion} value={data.complexion} labelColor={navyColor} />
            <ExportFieldRow
              label={lbl.maritalStatus}
              value={data.maritalStatus ? data.maritalStatus.replace('_', ' ') : undefined}
              labelColor={navyColor}
            />
            <ExportFieldRow
              label={lbl.religion}
              value={data.religion ? `${data.religion} ${data.caste ? `(${data.caste})` : ''}` : undefined}
              labelColor={navyColor}
            />
            <ExportFieldRow label={lbl.subCaste} value={data.subCaste} labelColor={navyColor} />
            <ExportFieldRow label={lbl.motherTongue} value={data.motherTongue} labelColor={navyColor} />
            <ExportFieldRow
              label={lbl.diet}
              value={data.diet && data.diet !== 'prefer_not_to_disclose' ? data.diet.replace('_', ' ') : undefined}
              labelColor={navyColor}
            />
            <ExportFieldRow label={lbl.nativePlace} value={data.nativePlace} labelColor={navyColor} />
            <ExportFieldRow
              label={lbl.currentLocation}
              value={[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}
              labelColor={navyColor}
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
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: navyColor,
                color: '#FFF8EE',
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase text-amber-200">{lbl.educationCareer}</span>
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
              <ExportFieldRow label={lbl.highestQualification} value={data.highestQualification} labelColor="#334155" />
              <ExportFieldRow label={lbl.degree} value={data.degree} labelColor="#334155" />
              <ExportFieldRow label={lbl.college} value={data.collegeUniversity} labelColor="#334155" />
              <ExportFieldRow label="Addl. Qualifications" value={data.additionalQualifications} labelColor="#334155" />
              <ExportFieldRow label={lbl.occupation} value={data.occupation} labelColor="#334155" />
              <ExportFieldRow label={lbl.jobTitle} value={data.jobTitle} labelColor="#334155" />
              {!data.hideEmployer && (
                <ExportFieldRow label={lbl.company} value={data.companyName} labelColor="#334155" />
              )}
              <ExportFieldRow label="Business" value={data.businessDetails} labelColor="#334155" />
              {!data.hideIncome && (
                <ExportFieldRow
                  label={lbl.annualIncome}
                  value={data.annualIncome ? `${data.incomeCurrency || 'INR'} ${data.annualIncome}` : undefined}
                  labelColor="#334155"
                />
              )}
              <ExportFieldRow label={lbl.workLocation} value={data.workLocation} labelColor="#334155" />
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName || data.fatherOccupation || data.motherOccupation || data.brothersCount > 0 || data.sistersCount > 0 || data.brothersDetails || data.sistersDetails || data.familyType || data.familyStatus || data.familyValues || data.familyNativePlace || data.familyResidence || data.familyIntroduction || (data.additionalFamilyMembers && data.additionalFamilyMembers.length > 0)) && (
          <div data-pdf-section="family-details">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: navyColor,
                color: '#FFF8EE',
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase text-amber-200">{lbl.familyDetails}</span>
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
                labelColor="#334155"
              />
              <ExportFieldRow
                label={lbl.motherName}
                value={data.motherName ? `${data.motherName} ${data.motherOccupation ? `(${data.motherOccupation})` : ''}` : undefined}
                labelColor="#334155"
              />
              {(data.brothersCount > 0 || data.brothersDetails) && (
                <ExportFieldRow
                  label={lbl.brothers}
                  value={`${data.brothersCount || 0} ${data.brothersDetails ? `— ${data.brothersDetails}` : ''}`}
                  labelColor="#334155"
                />
              )}
              {(data.sistersCount > 0 || data.sistersDetails) && (
                <ExportFieldRow
                  label={lbl.sisters}
                  value={`${data.sistersCount || 0} ${data.sistersDetails ? `— ${data.sistersDetails}` : ''}`}
                  labelColor="#334155"
                />
              )}
              <ExportFieldRow
                label={lbl.familyType}
                value={data.familyType === 'nuclear' ? 'Nuclear' : data.familyType === 'joint' ? 'Joint' : data.familyType ? 'Other' : undefined}
                labelColor="#334155"
              />
              <ExportFieldRow label={lbl.familyStatus || 'Family Status'} value={data.familyStatus} labelColor="#334155" />
              <ExportFieldRow label={lbl.familyValues} value={data.familyValues} labelColor="#334155" />
              <ExportFieldRow label={lbl.familyNative} value={data.familyNativePlace} labelColor="#334155" />
              <ExportFieldRow label={lbl.familyResidence} value={data.familyResidence} labelColor="#334155" fullWidth />
            </div>

            {data.familyIntroduction && (
              <p className="mt-2 text-slate-700 leading-relaxed italic">
                "{data.familyIntroduction}"
              </p>
            )}

            {data.additionalFamilyMembers?.length > 0 && (
              <div className="mt-2 border-t border-slate-200 pt-1.5 space-y-1">
                {data.additionalFamilyMembers.map((m) => (
                  <div key={m.id} className="text-slate-700">
                    <span className="font-semibold text-blue-950">{m.relation}:</span> {m.name} {m.details ? `(${m.details})` : ''}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Horoscope Section (If Enabled) */}
        {data.includeHoroscope && (
          <div data-pdf-section="horoscope-details">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: navyColor,
                color: '#FFF8EE',
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase text-amber-200">{lbl.horoscopeDetails}</span>
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
              <ExportFieldRow label={lbl.timeOfBirth} value={data.timeOfBirth} labelColor="#334155" />
              <ExportFieldRow label={lbl.placeOfBirth} value={data.placeOfBirth} labelColor="#334155" />
              <ExportFieldRow label={lbl.rashi} value={data.rashi} labelColor="#334155" />
              <ExportFieldRow label={lbl.nakshatra} value={data.nakshatra} labelColor="#334155" />
              <ExportFieldRow label={lbl.gotra} value={data.gotra} labelColor="#334155" />
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
                labelColor="#334155"
              />
              <ExportFieldRow label={lbl.kundaliNotes} value={data.horoscopeNotes} labelColor="#334155" fullWidth />
            </div>
          </div>
        )}

        {/* About Me & Lifestyle */}
        {(data.aboutMe || (data.hobbies && data.hobbies.length > 0) || data.personality || data.lifestyle || (data.languagesKnown && data.languagesKnown.length > 0)) && (
          <div data-pdf-section="about-me">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: navyColor,
                color: '#FFF8EE',
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase text-amber-200">{lbl.aboutMe}</span>
            </div>
            {data.aboutMe && (
              <p className="text-slate-700 leading-relaxed whitespace-pre-line mb-2">
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
              <ExportFieldRow label="Personality" value={data.personality} labelColor="#334155" />
              <ExportFieldRow label="Lifestyle" value={data.lifestyle} labelColor="#334155" />
              {data.hobbies && data.hobbies.length > 0 && (
                <ExportFieldRow label={lbl.hobbies} value={data.hobbies.join(', ')} labelColor="#334155" fullWidth />
              )}
              {data.languagesKnown && data.languagesKnown.length > 0 && (
                <ExportFieldRow label={lbl.languagesKnown} value={data.languagesKnown.join(', ')} labelColor="#334155" fullWidth />
              )}
            </div>
          </div>
        )}

        {/* Partner Preferences (If Enabled) */}
        {data.includePartnerPreferences && (
          <div data-pdf-section="partner-preferences">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: navyColor,
                color: '#FFF8EE',
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase text-amber-200">{lbl.partnerPreferences}</span>
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
                  labelColor="#334155"
                />
              )}
              <ExportFieldRow label={lbl.prefHeight} value={data.partnerHeightRange} labelColor="#334155" />
              <ExportFieldRow label={lbl.prefEducation} value={data.partnerEducation} labelColor="#334155" />
              <ExportFieldRow label={lbl.prefProfession} value={data.partnerProfession} labelColor="#334155" />
              <ExportFieldRow label={lbl.prefLocation} value={data.partnerLocation} labelColor="#334155" />
              <ExportFieldRow label="Mother Tongue" value={data.partnerMotherTongue} labelColor="#334155" />
              <ExportFieldRow label="Community" value={data.partnerCommunity} labelColor="#334155" />
              <ExportFieldRow label="Diet" value={data.partnerDiet} labelColor="#334155" />
            </div>
            {data.partnerExpectations && (
              <p className="mt-2 text-slate-700 italic">"{data.partnerExpectations}"</p>
            )}
          </div>
        )}

        {/* Contact Details (With Visibility Controls) */}
        {(data.contactPersonName || (data.showPhone && data.primaryPhone) || (data.showEmail && data.email) || (data.showAddress && data.residentialAddress)) && (
          <div data-pdf-section="contact-details">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: navyColor,
                color: '#FFF8EE',
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase text-amber-200">{lbl.contactDetails}</span>
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
                labelColor="#334155"
              />
              {data.showPhone && data.primaryPhone && (
                <ExportFieldRow
                  label={lbl.phone}
                  value={`${data.primaryPhone} ${data.alternatePhone ? `/ ${data.alternatePhone}` : ''}`}
                  labelColor="#334155"
                />
              )}
              {data.showEmail && data.email && (
                <ExportFieldRow label={lbl.email} value={data.email} labelColor="#334155" />
              )}
              {data.showAddress && data.residentialAddress && (
                <ExportFieldRow label={lbl.address} value={data.residentialAddress} labelColor="#334155" fullWidth />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
