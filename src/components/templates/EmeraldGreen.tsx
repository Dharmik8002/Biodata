import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, KalashIcon, GoldDivider, FONTS } from './templateUtils';
import { ExportFieldRow } from './ExportFieldRow';

export const EmeraldGreen: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);
  const emerald = '#064E3B';
  const gold = '#D97706';

  return (
    <div
      className="relative w-full h-full p-8 font-sans shadow-sm box-border overflow-hidden"
      style={{
        backgroundColor: '#F7FAF8',
        color: '#1f2937',
        border: `6px solid ${emerald}`,
        fontFamily: FONTS.sans,
      }}
    >
      {/* Gold Inset */}
      <div
        className="absolute inset-1.5 pointer-events-none"
        style={{ border: `1px solid ${gold}` }}
      />

      {/* Header */}
      <div className="text-center relative z-10 mb-6" data-pdf-section="header">
        <div className="flex justify-center mb-1">
          <KalashIcon className="w-8 h-8" color={emerald} />
        </div>
        {data.religiousHeading && (
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: emerald, fontFamily: FONTS.marcellus }}
          >
            {data.religiousHeading}
          </p>
        )}
        <h1
          className="text-2xl font-bold uppercase tracking-widest"
          style={{ color: emerald, fontFamily: FONTS.cinzel }}
        >
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color={gold} />
      </div>

      {/* Top Banner */}
      <div
        className="flex items-start gap-6 p-5 rounded-lg mb-6 shadow-xs relative z-10"
        style={{
          backgroundColor: '#EDF4F0',
          border: `1px solid ${emerald}40`,
        }}
        data-pdf-section="profile-banner"
      >
        {data.photoUrl && (
          <div className="shrink-0 relative">
            <div
              className="p-1 rounded-xl shadow-md"
              style={{
                backgroundColor: emerald,
                border: `2px solid ${gold}`,
              }}
            >
              <img
                src={data.photoUrl}
                alt={data.fullName}
                className="w-28 h-36 object-cover"
                style={{
                  borderRadius:
                    data.photoStyle === 'circle'
                      ? '9999px'
                      : data.photoStyle === 'rounded'
                      ? '8px'
                      : '0px',
                }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 space-y-1.5 min-w-0">
          <h2
            className="text-2xl font-bold tracking-wide"
            style={{ color: emerald, fontFamily: FONTS.playfair }}
          >
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic" style={{ color: emerald }}>
              "{data.profileHeadline}"
            </p>
          )}

          <div
            className="pt-2 border-t"
            style={{
              borderColor: `${emerald}30`,
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
              labelColor={emerald}
            />
            <ExportFieldRow label={lbl.height} value={data.heightFeet} labelColor={emerald} />
            <ExportFieldRow label={lbl.weight} value={data.weight} labelColor={emerald} />
            <ExportFieldRow label={lbl.bloodGroup} value={data.bloodGroup} labelColor={emerald} />
            <ExportFieldRow label={lbl.complexion} value={data.complexion} labelColor={emerald} />
            <ExportFieldRow
              label={lbl.maritalStatus}
              value={data.maritalStatus ? data.maritalStatus.replace('_', ' ') : undefined}
              labelColor={emerald}
            />
            <ExportFieldRow
              label={lbl.religion}
              value={data.religion ? `${data.religion} ${data.caste ? `(${data.caste})` : ''}` : undefined}
              labelColor={emerald}
            />
            <ExportFieldRow label={lbl.subCaste} value={data.subCaste} labelColor={emerald} />
            <ExportFieldRow label={lbl.motherTongue} value={data.motherTongue} labelColor={emerald} />
            <ExportFieldRow
              label={lbl.diet}
              value={data.diet && data.diet !== 'prefer_not_to_disclose' ? data.diet.replace('_', ' ') : undefined}
              labelColor={emerald}
            />
            <ExportFieldRow label={lbl.nativePlace} value={data.nativePlace} labelColor={emerald} />
            <ExportFieldRow
              label={lbl.currentLocation}
              value={[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}
              labelColor={emerald}
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
                backgroundColor: emerald,
                color: '#FEF3C7',
                fontFamily: FONTS.cinzel,
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
              <ExportFieldRow label={lbl.highestQualification} value={data.highestQualification} labelColor="#374151" />
              <ExportFieldRow label={lbl.degree} value={data.degree} labelColor="#374151" />
              <ExportFieldRow label={lbl.college} value={data.collegeUniversity} labelColor="#374151" />
              <ExportFieldRow label="Addl. Qualifications" value={data.additionalQualifications} labelColor="#374151" />
              <ExportFieldRow label={lbl.occupation} value={data.occupation} labelColor="#374151" />
              <ExportFieldRow label={lbl.jobTitle} value={data.jobTitle} labelColor="#374151" />
              {!data.hideEmployer && (
                <ExportFieldRow label={lbl.company} value={data.companyName} labelColor="#374151" />
              )}
              <ExportFieldRow label="Business" value={data.businessDetails} labelColor="#374151" />
              {!data.hideIncome && data.annualIncome && (
                <ExportFieldRow
                  label={lbl.annualIncome}
                  value={`${data.incomeCurrency || 'INR'} ${data.annualIncome}`}
                  labelColor="#374151"
                />
              )}
              <ExportFieldRow label={lbl.workLocation} value={data.workLocation} labelColor="#374151" />
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName || data.fatherOccupation || data.motherOccupation || data.brothersCount > 0 || data.sistersCount > 0 || data.brothersDetails || data.sistersDetails || data.familyType || data.familyStatus || data.familyValues || data.familyNativePlace || data.familyResidence || data.familyIntroduction || (data.additionalFamilyMembers && data.additionalFamilyMembers.length > 0)) && (
          <div data-pdf-section="family-details">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: emerald,
                color: '#FEF3C7',
                fontFamily: FONTS.cinzel,
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
                labelColor="#374151"
              />
              <ExportFieldRow
                label={lbl.motherName}
                value={data.motherName ? `${data.motherName} ${data.motherOccupation ? `(${data.motherOccupation})` : ''}` : undefined}
                labelColor="#374151"
              />
              {(data.brothersCount > 0 || data.brothersDetails) && (
                <ExportFieldRow
                  label={lbl.brothers}
                  value={`${data.brothersCount || 0} ${data.brothersDetails ? `(${data.brothersDetails})` : ''}`}
                  labelColor="#374151"
                />
              )}
              {(data.sistersCount > 0 || data.sistersDetails) && (
                <ExportFieldRow
                  label={lbl.sisters}
                  value={`${data.sistersCount || 0} ${data.sistersDetails ? `(${data.sistersDetails})` : ''}`}
                  labelColor="#374151"
                />
              )}
              <ExportFieldRow
                label={lbl.familyType}
                value={data.familyType === 'nuclear' ? 'Nuclear' : data.familyType === 'joint' ? 'Joint' : data.familyType ? 'Other' : undefined}
                labelColor="#374151"
              />
              <ExportFieldRow label={lbl.familyStatus || 'Family Status'} value={data.familyStatus} labelColor="#374151" />
              <ExportFieldRow label={lbl.familyValues} value={data.familyValues} labelColor="#374151" />
              <ExportFieldRow label={lbl.familyNative} value={data.familyNativePlace} labelColor="#374151" />
              <ExportFieldRow
                label={lbl.familyResidence}
                value={data.familyResidence}
                labelColor="#374151"
                fullWidth
              />
              {data.familyIntroduction && (
                <div style={{ gridColumn: 'span 2', marginTop: '4px' }}>
                  <span className="font-semibold text-slate-700">About Family: </span>
                  <span className="text-slate-600">{data.familyIntroduction}</span>
                </div>
              )}
            </div>

            {data.additionalFamilyMembers?.length > 0 && (
              <div
                className="mt-2 pt-1.5 space-y-1"
                style={{
                  borderTop: `1px solid ${emerald}30`,
                  paddingLeft: '6px',
                }}
              >
                {data.additionalFamilyMembers.map((m) => (
                  <div key={m.id} className="text-slate-700">
                    <span className="font-semibold">{m.relation}: </span>
                    <span>{m.name} {m.details ? `(${m.details})` : ''}</span>
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
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: emerald,
                color: '#FEF3C7',
                fontFamily: FONTS.cinzel,
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
              <ExportFieldRow label={lbl.timeOfBirth} value={data.timeOfBirth} labelColor="#374151" />
              <ExportFieldRow label={lbl.placeOfBirth} value={data.placeOfBirth} labelColor="#374151" />
              <ExportFieldRow label={lbl.rashi} value={data.rashi} labelColor="#374151" />
              <ExportFieldRow label={lbl.nakshatra} value={data.nakshatra} labelColor="#374151" />
              <ExportFieldRow label={lbl.gotra} value={data.gotra} labelColor="#374151" />
              <ExportFieldRow
                label={lbl.manglik}
                value={
                  data.manglikStatus === 'no'
                    ? 'Non-Manglik'
                    : data.manglikStatus === 'yes'
                    ? 'Manglik'
                    : data.manglikStatus === 'partial'
                    ? 'Anshik / Partial'
                    : data.manglikStatus ? 'Unknown' : undefined
                }
                labelColor="#374151"
              />
              {data.horoscopeNotes && (
                <div style={{ gridColumn: 'span 2' }}>
                  <span className="font-semibold text-slate-700">{lbl.kundaliNotes}: </span>
                  <span className="text-slate-600">{data.horoscopeNotes}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* About Me */}
        {(data.aboutMe || (data.hobbies && data.hobbies.length > 0) || data.personality || data.lifestyle || (data.languagesKnown && data.languagesKnown.length > 0)) && (
          <div data-pdf-section="about-me">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: emerald,
                color: '#FEF3C7',
                fontFamily: FONTS.cinzel,
              }}
            >
              <span className="font-bold tracking-wider uppercase">{lbl.aboutMe}</span>
            </div>
            {data.aboutMe && (
              <p className="text-slate-700 leading-relaxed whitespace-pre-line" style={{ paddingLeft: '6px' }}>
                {data.aboutMe}
              </p>
            )}
            <div
              className="mt-1.5"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '6px',
                paddingLeft: '6px',
                minWidth: 0,
              }}
            >
              <ExportFieldRow label="Personality" value={data.personality} labelColor="#374151" />
              <ExportFieldRow label="Lifestyle" value={data.lifestyle} labelColor="#374151" />
              {data.hobbies && data.hobbies.length > 0 && (
                <ExportFieldRow label={lbl.hobbies} value={data.hobbies.join(', ')} labelColor="#374151" fullWidth />
              )}
              {data.languagesKnown && data.languagesKnown.length > 0 && (
                <ExportFieldRow label={lbl.languagesKnown} value={data.languagesKnown.join(', ')} labelColor="#374151" fullWidth />
              )}
            </div>
          </div>
        )}

        {/* Partner Preferences (Optional) */}
        {data.includePartnerPreferences && (
          <div data-pdf-section="partner-preferences">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: emerald,
                color: '#FEF3C7',
                fontFamily: FONTS.cinzel,
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
                  labelColor="#374151"
                />
              )}
              <ExportFieldRow label={lbl.prefHeight} value={data.partnerHeightRange} labelColor="#374151" />
              <ExportFieldRow label={lbl.prefEducation} value={data.partnerEducation} labelColor="#374151" />
              <ExportFieldRow label={lbl.prefProfession} value={data.partnerProfession} labelColor="#374151" />
              <ExportFieldRow label={lbl.prefLocation} value={data.partnerLocation} labelColor="#374151" />
              <ExportFieldRow label="Mother Tongue" value={data.partnerMotherTongue} labelColor="#374151" />
              <ExportFieldRow label="Community" value={data.partnerCommunity} labelColor="#374151" />
              <ExportFieldRow label="Diet" value={data.partnerDiet} labelColor="#374151" />
            </div>
            {data.partnerExpectations && (
              <p className="mt-1 text-slate-700 italic" style={{ paddingLeft: '6px' }}>
                "{data.partnerExpectations}"
              </p>
            )}
          </div>
        )}

        {/* Contact Details */}
        {(data.contactPersonName || (data.showPhone && data.primaryPhone) || (data.showEmail && data.email) || (data.showAddress && data.residentialAddress)) && (
          <div data-pdf-section="contact-details">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-1 rounded-sm"
              style={{
                backgroundColor: emerald,
                color: '#FEF3C7',
                fontFamily: FONTS.cinzel,
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
                labelColor="#374151"
              />
              {data.showPhone && data.primaryPhone && (
                <ExportFieldRow
                  label={lbl.phone}
                  value={`${data.primaryPhone}${data.alternatePhone ? ` / ${data.alternatePhone}` : ''}`}
                  labelColor="#374151"
                />
              )}
              {data.showEmail && data.email && (
                <ExportFieldRow label={lbl.email} value={data.email} labelColor="#374151" />
              )}
              {data.showAddress && data.residentialAddress && (
                <ExportFieldRow
                  label={lbl.address}
                  value={data.residentialAddress}
                  labelColor="#374151"
                  fullWidth
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
