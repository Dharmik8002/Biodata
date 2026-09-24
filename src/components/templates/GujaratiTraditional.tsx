import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, GaneshaIcon, GoldDivider, FONTS } from './templateUtils';
import { ExportFieldRow } from './ExportFieldRow';

export const GujaratiTraditional: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);
  const redColor = '#B91C1C';
  const saffronColor = '#F59E0B';
  const gujaratiFont = "'Noto Sans Gujarati', 'Noto Sans Devanagari', 'Inter', sans-serif";

  return (
    <div
      className="relative w-full h-full p-8 shadow-sm box-border overflow-hidden"
      style={{
        backgroundColor: '#FFFDF5',
        color: '#0f172a',
        border: `6px solid ${redColor}`,
        fontFamily: gujaratiFont,
      }}
    >
      {/* Saffron and Gold Inset Borders */}
      <div className="absolute inset-1.5 border-2 border-[#F59E0B] pointer-events-none" />
      <div className="absolute inset-3 border border-[#B91C1C]/20 pointer-events-none" />

      {/* Header */}
      <div className="text-center relative z-10 mb-6" data-pdf-section="header">
        <div className="flex justify-center mb-1">
          <GaneshaIcon className="w-9 h-9" color={redColor} />
        </div>
        <p className="text-sm font-bold tracking-wide mb-1" style={{ color: redColor }}>
          {data.religiousHeading || (data.language === 'gu' ? '|| શ્રી ગણેશાય નમઃ ||' : '|| Shree Ganeshay Namah ||')}
        </p>
        <h1
          className="text-2xl font-bold uppercase tracking-wider"
          style={{ color: redColor, fontFamily: gujaratiFont }}
        >
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color={saffronColor} />
      </div>

      {/* Profile Card */}
      <div
        className="flex items-start gap-6 p-5 rounded-xl mb-6 shadow-xs relative z-10"
        style={{
          backgroundColor: '#FEF3C750',
          border: `1px solid ${saffronColor}80`,
        }}
        data-pdf-section="profile-banner"
      >
        {data.photoUrl && (
          <div
            className="shrink-0 p-1 rounded-xl shadow-sm"
            style={{
              backgroundColor: redColor,
              border: `2px solid ${saffronColor}`,
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
          <h2 className="text-2xl font-bold tracking-wide" style={{ color: redColor }}>
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-slate-700">"{data.profileHeadline}"</p>
          )}

          <div
            className="pt-2 border-t"
            style={{
              borderColor: `${saffronColor}60`,
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
              labelColor={redColor}
            />
            <ExportFieldRow label={lbl.height} value={data.heightFeet} labelColor={redColor} />
            <ExportFieldRow label={lbl.weight} value={data.weight} labelColor={redColor} />
            <ExportFieldRow label={lbl.bloodGroup} value={data.bloodGroup} labelColor={redColor} />
            <ExportFieldRow label={lbl.complexion} value={data.complexion} labelColor={redColor} />
            <ExportFieldRow
              label={lbl.maritalStatus}
              value={data.maritalStatus ? data.maritalStatus.replace('_', ' ') : undefined}
              labelColor={redColor}
            />
            <ExportFieldRow
              label={lbl.religion}
              value={data.religion ? `${data.religion} ${data.caste ? `(${data.caste})` : ''}` : undefined}
              labelColor={redColor}
            />
            <ExportFieldRow label={lbl.subCaste} value={data.subCaste} labelColor={redColor} />
            <ExportFieldRow label={lbl.motherTongue} value={data.motherTongue} labelColor={redColor} />
            <ExportFieldRow
              label={lbl.diet}
              value={data.diet && data.diet !== 'prefer_not_to_disclose' ? data.diet.replace('_', ' ') : undefined}
              labelColor={redColor}
            />
            <ExportFieldRow label={lbl.nativePlace} value={data.nativePlace} labelColor={redColor} />
            <ExportFieldRow
              label={lbl.currentLocation}
              value={[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}
              labelColor={redColor}
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
                backgroundColor: redColor,
                color: '#FFF8EE',
              }}
            >
              <span className="font-bold tracking-wider uppercase">{lbl.educationCareer}</span>
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
              <ExportFieldRow label={lbl.highestQualification} value={data.highestQualification} labelColor={redColor} />
              <ExportFieldRow label={lbl.degree} value={data.degree} labelColor={redColor} />
              <ExportFieldRow label={lbl.college} value={data.collegeUniversity} labelColor={redColor} />
              <ExportFieldRow label="Addl. Qualifications" value={data.additionalQualifications} labelColor={redColor} />
              <ExportFieldRow label={lbl.occupation} value={data.occupation} labelColor={redColor} />
              <ExportFieldRow label={lbl.jobTitle} value={data.jobTitle} labelColor={redColor} />
              {!data.hideEmployer && (
                <ExportFieldRow label={lbl.company} value={data.companyName} labelColor={redColor} />
              )}
              <ExportFieldRow label="Business" value={data.businessDetails} labelColor={redColor} />
              {!data.hideIncome && (
                <ExportFieldRow
                  label={lbl.annualIncome}
                  value={data.annualIncome ? `${data.incomeCurrency || 'INR'} ${data.annualIncome}` : undefined}
                  labelColor={redColor}
                />
              )}
              <ExportFieldRow label={lbl.workLocation} value={data.workLocation} labelColor={redColor} />
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName || data.fatherOccupation || data.motherOccupation || data.brothersCount > 0 || data.sistersCount > 0 || data.brothersDetails || data.sistersDetails || data.familyType || data.familyStatus || data.familyValues || data.familyNativePlace || data.familyResidence || data.familyIntroduction || (data.additionalFamilyMembers && data.additionalFamilyMembers.length > 0)) && (
          <div data-pdf-section="family-details">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: redColor,
                color: '#FFF8EE',
              }}
            >
              <span className="font-bold tracking-wider uppercase">{lbl.familyDetails}</span>
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
                labelColor={redColor}
              />
              <ExportFieldRow
                label={lbl.motherName}
                value={data.motherName ? `${data.motherName} ${data.motherOccupation ? `(${data.motherOccupation})` : ''}` : undefined}
                labelColor={redColor}
              />
              {(data.brothersCount > 0 || data.brothersDetails) && (
                <ExportFieldRow
                  label={lbl.brothers}
                  value={`${data.brothersCount || 0} ${data.brothersDetails ? `— ${data.brothersDetails}` : ''}`}
                  labelColor={redColor}
                />
              )}
              {(data.sistersCount > 0 || data.sistersDetails) && (
                <ExportFieldRow
                  label={lbl.sisters}
                  value={`${data.sistersCount || 0} ${data.sistersDetails ? `— ${data.sistersDetails}` : ''}`}
                  labelColor={redColor}
                />
              )}
              <ExportFieldRow
                label={lbl.familyType}
                value={data.familyType === 'nuclear' ? 'Nuclear' : data.familyType === 'joint' ? 'Joint' : data.familyType ? 'Other' : undefined}
                labelColor={redColor}
              />
              <ExportFieldRow label={lbl.familyStatus || 'Family Status'} value={data.familyStatus} labelColor={redColor} />
              <ExportFieldRow label={lbl.familyValues} value={data.familyValues} labelColor={redColor} />
              <ExportFieldRow label={lbl.familyNative} value={data.familyNativePlace} labelColor={redColor} />
              <ExportFieldRow label={lbl.familyResidence} value={data.familyResidence} labelColor={redColor} fullWidth />
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
                    <span className="font-semibold text-red-900">{m.relation}:</span> {m.name} {m.details ? `(${m.details})` : ''}
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
                backgroundColor: redColor,
                color: '#FFF8EE',
              }}
            >
              <span className="font-bold tracking-wider uppercase">{lbl.horoscopeDetails}</span>
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
              <ExportFieldRow label={lbl.timeOfBirth} value={data.timeOfBirth} labelColor={redColor} />
              <ExportFieldRow label={lbl.placeOfBirth} value={data.placeOfBirth} labelColor={redColor} />
              <ExportFieldRow label={lbl.rashi} value={data.rashi} labelColor={redColor} />
              <ExportFieldRow label={lbl.nakshatra} value={data.nakshatra} labelColor={redColor} />
              <ExportFieldRow label={lbl.gotra} value={data.gotra} labelColor={redColor} />
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
                labelColor={redColor}
              />
              <ExportFieldRow label={lbl.kundaliNotes} value={data.horoscopeNotes} labelColor={redColor} fullWidth />
            </div>
          </div>
        )}

        {/* About Me & Lifestyle */}
        {(data.aboutMe || (data.hobbies && data.hobbies.length > 0) || data.personality || data.lifestyle || (data.languagesKnown && data.languagesKnown.length > 0)) && (
          <div data-pdf-section="about-me">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: redColor,
                color: '#FFF8EE',
              }}
            >
              <span className="font-bold tracking-wider uppercase">{lbl.aboutMe}</span>
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
              <ExportFieldRow label="Personality" value={data.personality} labelColor={redColor} />
              <ExportFieldRow label="Lifestyle" value={data.lifestyle} labelColor={redColor} />
              {data.hobbies && data.hobbies.length > 0 && (
                <ExportFieldRow label={lbl.hobbies} value={data.hobbies.join(', ')} labelColor={redColor} fullWidth />
              )}
              {data.languagesKnown && data.languagesKnown.length > 0 && (
                <ExportFieldRow label={lbl.languagesKnown} value={data.languagesKnown.join(', ')} labelColor={redColor} fullWidth />
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
                backgroundColor: redColor,
                color: '#FFF8EE',
              }}
            >
              <span className="font-bold tracking-wider uppercase">{lbl.partnerPreferences}</span>
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
                  labelColor={redColor}
                />
              )}
              <ExportFieldRow label={lbl.prefHeight} value={data.partnerHeightRange} labelColor={redColor} />
              <ExportFieldRow label={lbl.prefEducation} value={data.partnerEducation} labelColor={redColor} />
              <ExportFieldRow label={lbl.prefProfession} value={data.partnerProfession} labelColor={redColor} />
              <ExportFieldRow label={lbl.prefLocation} value={data.partnerLocation} labelColor={redColor} />
              <ExportFieldRow label="Mother Tongue" value={data.partnerMotherTongue} labelColor={redColor} />
              <ExportFieldRow label="Community" value={data.partnerCommunity} labelColor={redColor} />
              <ExportFieldRow label="Diet" value={data.partnerDiet} labelColor={redColor} />
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
                backgroundColor: redColor,
                color: '#FFF8EE',
              }}
            >
              <span className="font-bold tracking-wider uppercase">{lbl.contactDetails}</span>
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
                labelColor={redColor}
              />
              {data.showPhone && data.primaryPhone && (
                <ExportFieldRow
                  label={lbl.phone}
                  value={`${data.primaryPhone} ${data.alternatePhone ? `/ ${data.alternatePhone}` : ''}`}
                  labelColor={redColor}
                />
              )}
              {data.showEmail && data.email && (
                <ExportFieldRow label={lbl.email} value={data.email} labelColor={redColor} />
              )}
              {data.showAddress && data.residentialAddress && (
                <ExportFieldRow label={lbl.address} value={data.residentialAddress} labelColor={redColor} fullWidth />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
