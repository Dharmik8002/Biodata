import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, FONTS } from './templateUtils';
import { ExportFieldRow } from './ExportFieldRow';

export const ModernMinimalist: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div
      className="relative w-full h-full p-8 shadow-sm box-border"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#0f172a',
        border: '1px solid #cbd5e1',
        fontFamily: FONTS.sans,
      }}
    >
      {/* Sleek Top Header */}
      <div
        className="flex items-start justify-between gap-6 border-b pb-6 mb-6"
        style={{ borderColor: '#e2e8f0' }}
        data-pdf-section="header"
      >
        <div className="space-y-1 flex-1 min-w-0">
          {data.religiousHeading && (
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              {data.religiousHeading}
            </p>
          )}
          <h1
            className="text-2xl font-bold tracking-tight text-slate-900"
            style={{ fontFamily: FONTS.sans }}
          >
            {data.fullName}
          </h1>
          <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
            {data.title || lbl.marriageBiodata}
          </p>
          {data.profileHeadline && (
            <p className="text-xs text-slate-600 pt-1 italic max-w-md">"{data.profileHeadline}"</p>
          )}
        </div>

        {data.photoUrl && (
          <div className="shrink-0">
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className="w-28 h-32 object-cover border border-slate-200 shadow-sm"
              style={{
                borderRadius: data.photoStyle === 'circle' ? '9999px' : '8px',
              }}
            />
          </div>
        )}
      </div>

      {/* Main Grid Content */}
      <div className="space-y-5 text-xs">
        {/* Personal Details */}
        <div data-pdf-section="personal-details">
          <h3
            className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5"
            style={{ borderColor: '#e2e8f0' }}
          >
            {lbl.personalDetails}
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
              label={lbl.dateOfBirth}
              value={data.dateOfBirth ? `${data.dateOfBirth} ${data.age > 0 ? `(${data.age} yrs)` : ''}` : undefined}
              labelColor="#64748b"
            />
            <ExportFieldRow label={lbl.height} value={data.heightFeet} labelColor="#64748b" />
            <ExportFieldRow label={lbl.weight} value={data.weight} labelColor="#64748b" />
            <ExportFieldRow label={lbl.bloodGroup} value={data.bloodGroup} labelColor="#64748b" />
            <ExportFieldRow label={lbl.complexion} value={data.complexion} labelColor="#64748b" />
            <ExportFieldRow
              label={lbl.maritalStatus}
              value={data.maritalStatus ? data.maritalStatus.replace('_', ' ') : undefined}
              labelColor="#64748b"
            />
            <ExportFieldRow
              label={lbl.religion}
              value={data.religion ? `${data.religion} ${data.caste ? `(${data.caste})` : ''}` : undefined}
              labelColor="#64748b"
            />
            <ExportFieldRow label={lbl.subCaste} value={data.subCaste} labelColor="#64748b" />
            <ExportFieldRow label={lbl.motherTongue} value={data.motherTongue} labelColor="#64748b" />
            <ExportFieldRow
              label={lbl.diet}
              value={data.diet && data.diet !== 'prefer_not_to_disclose' ? data.diet.replace('_', ' ') : undefined}
              labelColor="#64748b"
            />
            <ExportFieldRow label={lbl.nativePlace} value={data.nativePlace} labelColor="#64748b" />
            <ExportFieldRow
              label={lbl.currentLocation}
              value={[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}
              labelColor="#64748b"
              fullWidth
            />
          </div>
        </div>

        {/* Education & Career */}
        {(data.highestQualification || data.occupation || data.jobTitle) && (
          <div data-pdf-section="education-career">
            <h3
              className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5"
              style={{ borderColor: '#e2e8f0' }}
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
              <ExportFieldRow label={lbl.highestQualification} value={data.highestQualification} labelColor="#64748b" />
              <ExportFieldRow label={lbl.degree} value={data.degree} labelColor="#64748b" />
              <ExportFieldRow label={lbl.college} value={data.collegeUniversity} labelColor="#64748b" />
              <ExportFieldRow label="Addl. Qualifications" value={data.additionalQualifications} labelColor="#64748b" />
              <ExportFieldRow label={lbl.occupation} value={data.occupation} labelColor="#64748b" />
              <ExportFieldRow label={lbl.jobTitle} value={data.jobTitle} labelColor="#64748b" />
              {!data.hideEmployer && (
                <ExportFieldRow label={lbl.company} value={data.companyName} labelColor="#64748b" />
              )}
              <ExportFieldRow label="Business" value={data.businessDetails} labelColor="#64748b" />
              {!data.hideIncome && (
                <ExportFieldRow
                  label={lbl.annualIncome}
                  value={data.annualIncome ? `${data.incomeCurrency || 'INR'} ${data.annualIncome}` : undefined}
                  labelColor="#64748b"
                />
              )}
              <ExportFieldRow label={lbl.workLocation} value={data.workLocation} labelColor="#64748b" />
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName || data.fatherOccupation || data.motherOccupation || data.brothersCount > 0 || data.sistersCount > 0 || data.brothersDetails || data.sistersDetails || data.familyType || data.familyStatus || data.familyValues || data.familyNativePlace || data.familyResidence || data.familyIntroduction || (data.additionalFamilyMembers && data.additionalFamilyMembers.length > 0)) && (
          <div data-pdf-section="family-details">
            <h3
              className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5"
              style={{ borderColor: '#e2e8f0' }}
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
                labelColor="#64748b"
              />
              <ExportFieldRow
                label={lbl.motherName}
                value={data.motherName ? `${data.motherName} ${data.motherOccupation ? `(${data.motherOccupation})` : ''}` : undefined}
                labelColor="#64748b"
              />
              {(data.brothersCount > 0 || data.brothersDetails) && (
                <ExportFieldRow
                  label={lbl.brothers}
                  value={`${data.brothersCount || 0} ${data.brothersDetails ? `— ${data.brothersDetails}` : ''}`}
                  labelColor="#64748b"
                />
              )}
              {(data.sistersCount > 0 || data.sistersDetails) && (
                <ExportFieldRow
                  label={lbl.sisters}
                  value={`${data.sistersCount || 0} ${data.sistersDetails ? `— ${data.sistersDetails}` : ''}`}
                  labelColor="#64748b"
                />
              )}
              <ExportFieldRow
                label={lbl.familyType}
                value={data.familyType === 'nuclear' ? 'Nuclear' : data.familyType === 'joint' ? 'Joint' : data.familyType ? 'Other' : undefined}
                labelColor="#64748b"
              />
              <ExportFieldRow label={lbl.familyStatus || 'Family Status'} value={data.familyStatus} labelColor="#64748b" />
              <ExportFieldRow label={lbl.familyValues} value={data.familyValues} labelColor="#64748b" />
              <ExportFieldRow label={lbl.familyNative} value={data.familyNativePlace} labelColor="#64748b" />
              <ExportFieldRow label={lbl.familyResidence} value={data.familyResidence} labelColor="#64748b" fullWidth />
            </div>

            {data.familyIntroduction && (
              <p className="mt-2 text-slate-600 leading-relaxed italic">
                "{data.familyIntroduction}"
              </p>
            )}

            {data.additionalFamilyMembers?.length > 0 && (
              <div className="mt-2 border-t border-slate-100 pt-1.5 space-y-1">
                {data.additionalFamilyMembers.map((m) => (
                  <div key={m.id} className="text-slate-700">
                    <span className="font-semibold text-slate-900">{m.relation}:</span> {m.name} {m.details ? `(${m.details})` : ''}
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
              className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5"
              style={{ borderColor: '#e2e8f0' }}
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
              <ExportFieldRow label={lbl.timeOfBirth} value={data.timeOfBirth} labelColor="#64748b" />
              <ExportFieldRow label={lbl.placeOfBirth} value={data.placeOfBirth} labelColor="#64748b" />
              <ExportFieldRow label={lbl.rashi} value={data.rashi} labelColor="#64748b" />
              <ExportFieldRow label={lbl.nakshatra} value={data.nakshatra} labelColor="#64748b" />
              <ExportFieldRow label={lbl.gotra} value={data.gotra} labelColor="#64748b" />
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
                labelColor="#64748b"
              />
              <ExportFieldRow label={lbl.kundaliNotes} value={data.horoscopeNotes} labelColor="#64748b" fullWidth />
            </div>
          </div>
        )}

        {/* About Me & Lifestyle */}
        {(data.aboutMe || (data.hobbies && data.hobbies.length > 0) || data.personality || data.lifestyle || (data.languagesKnown && data.languagesKnown.length > 0)) && (
          <div data-pdf-section="about-me">
            <h3
              className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5"
              style={{ borderColor: '#e2e8f0' }}
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
                minWidth: 0,
              }}
            >
              <ExportFieldRow label="Personality" value={data.personality} labelColor="#64748b" />
              <ExportFieldRow label="Lifestyle" value={data.lifestyle} labelColor="#64748b" />
              {data.hobbies && data.hobbies.length > 0 && (
                <ExportFieldRow label={lbl.hobbies} value={data.hobbies.join(', ')} labelColor="#64748b" fullWidth />
              )}
              {data.languagesKnown && data.languagesKnown.length > 0 && (
                <ExportFieldRow label={lbl.languagesKnown} value={data.languagesKnown.join(', ')} labelColor="#64748b" fullWidth />
              )}
            </div>
          </div>
        )}

        {/* Partner Preferences (If Enabled) */}
        {data.includePartnerPreferences && (
          <div data-pdf-section="partner-preferences">
            <h3
              className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5"
              style={{ borderColor: '#e2e8f0' }}
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
                  labelColor="#64748b"
                />
              )}
              <ExportFieldRow label={lbl.prefHeight} value={data.partnerHeightRange} labelColor="#64748b" />
              <ExportFieldRow label={lbl.prefEducation} value={data.partnerEducation} labelColor="#64748b" />
              <ExportFieldRow label={lbl.prefProfession} value={data.partnerProfession} labelColor="#64748b" />
              <ExportFieldRow label={lbl.prefLocation} value={data.partnerLocation} labelColor="#64748b" />
              <ExportFieldRow label="Mother Tongue" value={data.partnerMotherTongue} labelColor="#64748b" />
              <ExportFieldRow label="Community" value={data.partnerCommunity} labelColor="#64748b" />
              <ExportFieldRow label="Diet" value={data.partnerDiet} labelColor="#64748b" />
            </div>
            {data.partnerExpectations && (
              <p className="mt-2 text-slate-600 italic">"{data.partnerExpectations}"</p>
            )}
          </div>
        )}

        {/* Contact Details */}
        {(data.contactPersonName || (data.showPhone && data.primaryPhone) || (data.showEmail && data.email) || (data.showAddress && data.residentialAddress)) && (
          <div data-pdf-section="contact-details">
            <h3
              className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5"
              style={{ borderColor: '#e2e8f0' }}
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
                labelColor="#64748b"
              />
              {data.showPhone && data.primaryPhone && (
                <ExportFieldRow
                  label={lbl.phone}
                  value={`${data.primaryPhone} ${data.alternatePhone ? `/ ${data.alternatePhone}` : ''}`}
                  labelColor="#64748b"
                />
              )}
              {data.showEmail && data.email && (
                <ExportFieldRow label={lbl.email} value={data.email} labelColor="#64748b" />
              )}
              {data.showAddress && data.residentialAddress && (
                <ExportFieldRow label={lbl.address} value={data.residentialAddress} labelColor="#64748b" fullWidth />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
