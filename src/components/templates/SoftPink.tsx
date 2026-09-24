import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, FONTS } from './templateUtils';
import { ExportFieldRow } from './ExportFieldRow';

export const SoftPink: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);
  const pinkBorder = '#F472B6';
  const roseHeading = '#BE185D';
  const deepRose = '#9D174D';

  return (
    <div
      className="relative w-full h-full p-8 shadow-sm box-border overflow-hidden"
      style={{
        backgroundColor: '#FFF5F7',
        color: '#1e293b',
        border: `4px solid ${pinkBorder}80`,
        fontFamily: FONTS.sans,
      }}
    >
      {/* Decorative Subtle Header */}
      <div
        className="text-center mb-6 pb-4 border-b"
        style={{ borderColor: `${pinkBorder}50` }}
        data-pdf-section="header"
      >
        {data.religiousHeading && (
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: roseHeading, fontFamily: FONTS.marcellus }}
          >
            {data.religiousHeading}
          </p>
        )}
        <h1
          className="text-2xl font-bold tracking-wide"
          style={{ color: roseHeading, fontFamily: FONTS.playfair }}
        >
          {data.title || lbl.marriageBiodata}
        </h1>
      </div>

      {/* Top Banner with Photo */}
      <div
        className="flex items-start gap-6 p-5 rounded-xl mb-6 shadow-xs relative z-10"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid #FBCFE8',
        }}
        data-pdf-section="profile-banner"
      >
        {data.photoUrl && (
          <div
            className="shrink-0 p-1 rounded-xl"
            style={{
              backgroundColor: '#FDF2F8',
              border: `2px solid ${pinkBorder}`,
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

        <div className="flex-1 space-y-1 min-w-0">
          <h2
            className="text-2xl font-bold"
            style={{ color: deepRose, fontFamily: FONTS.playfair }}
          >
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic" style={{ color: roseHeading }}>
              "{data.profileHeadline}"
            </p>
          )}

          <div
            className="pt-2 border-t"
            style={{
              borderColor: '#FBCFE8',
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
              labelColor={deepRose}
            />
            <ExportFieldRow label={lbl.height} value={data.heightFeet} labelColor={deepRose} />
            <ExportFieldRow label={lbl.weight} value={data.weight} labelColor={deepRose} />
            <ExportFieldRow label={lbl.bloodGroup} value={data.bloodGroup} labelColor={deepRose} />
            <ExportFieldRow label={lbl.complexion} value={data.complexion} labelColor={deepRose} />
            <ExportFieldRow
              label={lbl.maritalStatus}
              value={data.maritalStatus ? data.maritalStatus.replace('_', ' ') : undefined}
              labelColor={deepRose}
            />
            <ExportFieldRow
              label={lbl.religion}
              value={data.religion ? `${data.religion} ${data.caste ? `(${data.caste})` : ''}` : undefined}
              labelColor={deepRose}
            />
            <ExportFieldRow label={lbl.subCaste} value={data.subCaste} labelColor={deepRose} />
            <ExportFieldRow label={lbl.motherTongue} value={data.motherTongue} labelColor={deepRose} />
            <ExportFieldRow
              label={lbl.diet}
              value={data.diet && data.diet !== 'prefer_not_to_disclose' ? data.diet.replace('_', ' ') : undefined}
              labelColor={deepRose}
            />
            <ExportFieldRow label={lbl.nativePlace} value={data.nativePlace} labelColor={deepRose} />
            <ExportFieldRow
              label={lbl.currentLocation}
              value={[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}
              labelColor={deepRose}
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
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: deepRose,
                borderColor: '#FBCFE8',
                fontFamily: FONTS.playfair,
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
                paddingLeft: '4px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label={lbl.highestQualification} value={data.highestQualification} labelColor="#475569" />
              <ExportFieldRow label={lbl.degree} value={data.degree} labelColor="#475569" />
              <ExportFieldRow label={lbl.college} value={data.collegeUniversity} labelColor="#475569" />
              <ExportFieldRow label="Addl. Qualifications" value={data.additionalQualifications} labelColor="#475569" />
              <ExportFieldRow label={lbl.occupation} value={data.occupation} labelColor="#475569" />
              <ExportFieldRow label={lbl.jobTitle} value={data.jobTitle} labelColor="#475569" />
              {!data.hideEmployer && (
                <ExportFieldRow label={lbl.company} value={data.companyName} labelColor="#475569" />
              )}
              <ExportFieldRow label="Business" value={data.businessDetails} labelColor="#475569" />
              {!data.hideIncome && (
                <ExportFieldRow
                  label={lbl.annualIncome}
                  value={data.annualIncome ? `${data.incomeCurrency || 'INR'} ${data.annualIncome}` : undefined}
                  labelColor="#475569"
                />
              )}
              <ExportFieldRow label={lbl.workLocation} value={data.workLocation} labelColor="#475569" />
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName || data.fatherOccupation || data.motherOccupation || data.brothersCount > 0 || data.sistersCount > 0 || data.brothersDetails || data.sistersDetails || data.familyType || data.familyStatus || data.familyValues || data.familyNativePlace || data.familyResidence || data.familyIntroduction || (data.additionalFamilyMembers && data.additionalFamilyMembers.length > 0)) && (
          <div data-pdf-section="family-details">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: deepRose,
                borderColor: '#FBCFE8',
                fontFamily: FONTS.playfair,
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
                paddingLeft: '4px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow
                label={lbl.fatherName}
                value={data.fatherName ? `${data.fatherName} ${data.fatherOccupation ? `(${data.fatherOccupation})` : ''}` : undefined}
                labelColor="#475569"
              />
              <ExportFieldRow
                label={lbl.motherName}
                value={data.motherName ? `${data.motherName} ${data.motherOccupation ? `(${data.motherOccupation})` : ''}` : undefined}
                labelColor="#475569"
              />
              {(data.brothersCount > 0 || data.brothersDetails) && (
                <ExportFieldRow
                  label={lbl.brothers}
                  value={`${data.brothersCount || 0} ${data.brothersDetails ? `— ${data.brothersDetails}` : ''}`}
                  labelColor="#475569"
                />
              )}
              {(data.sistersCount > 0 || data.sistersDetails) && (
                <ExportFieldRow
                  label={lbl.sisters}
                  value={`${data.sistersCount || 0} ${data.sistersDetails ? `— ${data.sistersDetails}` : ''}`}
                  labelColor="#475569"
                />
              )}
              <ExportFieldRow
                label={lbl.familyType}
                value={data.familyType === 'nuclear' ? 'Nuclear' : data.familyType === 'joint' ? 'Joint' : data.familyType ? 'Other' : undefined}
                labelColor="#475569"
              />
              <ExportFieldRow label={lbl.familyStatus || 'Family Status'} value={data.familyStatus} labelColor="#475569" />
              <ExportFieldRow label={lbl.familyValues} value={data.familyValues} labelColor="#475569" />
              <ExportFieldRow label={lbl.familyNative} value={data.familyNativePlace} labelColor="#475569" />
              <ExportFieldRow label={lbl.familyResidence} value={data.familyResidence} labelColor="#475569" fullWidth />
            </div>

            {data.familyIntroduction && (
              <p className="mt-2 text-slate-700 leading-relaxed italic">
                "{data.familyIntroduction}"
              </p>
            )}

            {data.additionalFamilyMembers?.length > 0 && (
              <div className="mt-2 border-t border-pink-100 pt-1.5 space-y-1">
                {data.additionalFamilyMembers.map((m) => (
                  <div key={m.id} className="text-slate-700">
                    <span className="font-semibold text-rose-800">{m.relation}:</span> {m.name} {m.details ? `(${m.details})` : ''}
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
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: deepRose,
                borderColor: '#FBCFE8',
                fontFamily: FONTS.playfair,
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
                paddingLeft: '4px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label={lbl.timeOfBirth} value={data.timeOfBirth} labelColor="#475569" />
              <ExportFieldRow label={lbl.placeOfBirth} value={data.placeOfBirth} labelColor="#475569" />
              <ExportFieldRow label={lbl.rashi} value={data.rashi} labelColor="#475569" />
              <ExportFieldRow label={lbl.nakshatra} value={data.nakshatra} labelColor="#475569" />
              <ExportFieldRow label={lbl.gotra} value={data.gotra} labelColor="#475569" />
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
                labelColor="#475569"
              />
              <ExportFieldRow label={lbl.kundaliNotes} value={data.horoscopeNotes} labelColor="#475569" fullWidth />
            </div>
          </div>
        )}

        {/* About Me & Lifestyle */}
        {(data.aboutMe || (data.hobbies && data.hobbies.length > 0) || data.personality || data.lifestyle || (data.languagesKnown && data.languagesKnown.length > 0)) && (
          <div data-pdf-section="about-me">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: deepRose,
                borderColor: '#FBCFE8',
                fontFamily: FONTS.playfair,
              }}
            >
              {lbl.aboutMe}
            </h3>
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
                paddingLeft: '4px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label="Personality" value={data.personality} labelColor="#475569" />
              <ExportFieldRow label="Lifestyle" value={data.lifestyle} labelColor="#475569" />
              {data.hobbies && data.hobbies.length > 0 && (
                <ExportFieldRow label={lbl.hobbies} value={data.hobbies.join(', ')} labelColor="#475569" fullWidth />
              )}
              {data.languagesKnown && data.languagesKnown.length > 0 && (
                <ExportFieldRow label={lbl.languagesKnown} value={data.languagesKnown.join(', ')} labelColor="#475569" fullWidth />
              )}
            </div>
          </div>
        )}

        {/* Partner Preferences (If Enabled) */}
        {data.includePartnerPreferences && (
          <div data-pdf-section="partner-preferences">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: deepRose,
                borderColor: '#FBCFE8',
                fontFamily: FONTS.playfair,
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
                paddingLeft: '4px',
                minWidth: 0,
              }}
            >
              {(data.partnerAgeMin || data.partnerAgeMax) && (
                <ExportFieldRow
                  label={lbl.prefAge}
                  value={`${data.partnerAgeMin || 18} - ${data.partnerAgeMax || 40} ${lbl.years}`}
                  labelColor="#475569"
                />
              )}
              <ExportFieldRow label={lbl.prefHeight} value={data.partnerHeightRange} labelColor="#475569" />
              <ExportFieldRow label={lbl.prefEducation} value={data.partnerEducation} labelColor="#475569" />
              <ExportFieldRow label={lbl.prefProfession} value={data.partnerProfession} labelColor="#475569" />
              <ExportFieldRow label={lbl.prefLocation} value={data.partnerLocation} labelColor="#475569" />
              <ExportFieldRow label="Mother Tongue" value={data.partnerMotherTongue} labelColor="#475569" />
              <ExportFieldRow label="Community" value={data.partnerCommunity} labelColor="#475569" />
              <ExportFieldRow label="Diet" value={data.partnerDiet} labelColor="#475569" />
            </div>
            {data.partnerExpectations && (
              <p className="mt-2 text-slate-700 italic">"{data.partnerExpectations}"</p>
            )}
          </div>
        )}

        {/* Contact Details (With Visibility Controls) */}
        {(data.contactPersonName || (data.showPhone && data.primaryPhone) || (data.showEmail && data.email) || (data.showAddress && data.residentialAddress)) && (
          <div data-pdf-section="contact-details">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: deepRose,
                borderColor: '#FBCFE8',
                fontFamily: FONTS.playfair,
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
                paddingLeft: '4px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow
                label={lbl.contactPerson}
                value={data.contactPersonName ? `${data.contactPersonName} ${data.relationship ? `(${data.relationship})` : ''}` : undefined}
                labelColor="#475569"
              />
              {data.showPhone && data.primaryPhone && (
                <ExportFieldRow
                  label={lbl.phone}
                  value={`${data.primaryPhone} ${data.alternatePhone ? `/ ${data.alternatePhone}` : ''}`}
                  labelColor="#475569"
                />
              )}
              {data.showEmail && data.email && (
                <ExportFieldRow label={lbl.email} value={data.email} labelColor="#475569" />
              )}
              {data.showAddress && data.residentialAddress && (
                <ExportFieldRow label={lbl.address} value={data.residentialAddress} labelColor="#475569" fullWidth />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
