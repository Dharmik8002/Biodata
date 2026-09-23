import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, GaneshaIcon, FloralCorner, GoldDivider } from './templateUtils';

interface TemplateProps {
  data: BiodataData;
}

export const RoyalMaroonGold: React.FC<TemplateProps> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div className="relative w-full h-full bg-[#FFFDF9] text-slate-800 p-8 sm:p-10 font-sans shadow-sm border-[6px] border-[#800020] box-border overflow-hidden">
      {/* Outer & Inner Gold Borders */}
      <div className="absolute inset-1.5 border border-[#D4AF37] pointer-events-none" />
      <div className="absolute inset-3 border border-[#800020]/20 pointer-events-none" />

      {/* Ornate Corner Accents */}
      <div className="absolute top-4 left-4"><FloralCorner className="w-10 h-10 text-[#D4AF37]" /></div>
      <div className="absolute top-4 right-4 rotate-90"><FloralCorner className="w-10 h-10 text-[#D4AF37]" /></div>
      <div className="absolute bottom-4 left-4 -rotate-90"><FloralCorner className="w-10 h-10 text-[#D4AF37]" /></div>
      <div className="absolute bottom-4 right-4 rotate-180"><FloralCorner className="w-10 h-10 text-[#D4AF37]" /></div>

      {/* Header Section */}
      <div className="text-center relative z-10 mb-6">
        <div className="flex justify-center mb-1">
          <GaneshaIcon className="w-9 h-9" color="#800020" />
        </div>
        {data.religiousHeading && (
          <p className="text-xs font-semibold text-[#800020] tracking-wider mb-1 font-marcellus">
            {data.religiousHeading}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-[#800020] font-cinzel">
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color="#D4AF37" />
      </div>

      {/* Profile Overview Card (Photo + Core Details) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-[#FAF5EE] p-5 rounded-lg border border-[#D4AF37]/50 mb-6 relative z-10 shadow-xs">
        {data.photoUrl && (
          <div className="shrink-0 relative">
            <div className="p-1 bg-[#800020] rounded-xl shadow-md border-2 border-[#D4AF37]">
              <img
                src={data.photoUrl}
                alt={data.fullName}
                className={`w-28 h-36 object-cover ${
                  data.photoStyle === 'circle'
                    ? 'rounded-full'
                    : data.photoStyle === 'rounded'
                    ? 'rounded-lg'
                    : 'rounded-none'
                }`}
              />
            </div>
          </div>
        )}

        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#800020] font-playfair tracking-wide">
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-slate-600 font-medium">"{data.profileHeadline}"</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-1.5 border-t border-[#D4AF37]/40">
            {data.dateOfBirth && (
              <div>
                <span className="font-semibold text-[#800020]">{lbl.dateOfBirth}:</span>{' '}
                <span>{data.dateOfBirth} {data.age > 0 ? `(${data.age} ${lbl.years})` : ''}</span>
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="font-semibold text-[#800020]">{lbl.height}:</span>{' '}
                <span>{data.heightFeet} {data.heightCm ? `(${data.heightCm})` : ''}</span>
              </div>
            )}
            {data.religion && (
              <div>
                <span className="font-semibold text-[#800020]">{lbl.religion}:</span>{' '}
                <span>{data.religion} {data.caste ? `(${data.caste})` : ''}</span>
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="font-semibold text-[#800020]">{lbl.motherTongue}:</span>{' '}
                <span>{data.motherTongue}</span>
              </div>
            )}
            {data.currentCity && (
              <div className="col-span-2">
                <span className="font-semibold text-[#800020]">{lbl.currentLocation}:</span>{' '}
                <span>{[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-5 text-xs relative z-10">
        {/* Education & Career */}
        {(data.highestQualification || data.occupation) && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#800020] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.educationCareer}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
              {data.highestQualification && (
                <div><span className="font-semibold text-slate-700">{lbl.highestQualification}:</span> {data.highestQualification}</div>
              )}
              {data.degree && (
                <div><span className="font-semibold text-slate-700">{lbl.degree}:</span> {data.degree}</div>
              )}
              {data.collegeUniversity && (
                <div><span className="font-semibold text-slate-700">{lbl.college}:</span> {data.collegeUniversity}</div>
              )}
              {data.occupation && (
                <div><span className="font-semibold text-slate-700">{lbl.occupation}:</span> {data.occupation}</div>
              )}
              {data.jobTitle && (
                <div><span className="font-semibold text-slate-700">{lbl.jobTitle}:</span> {data.jobTitle}</div>
              )}
              {!data.hideEmployer && data.companyName && (
                <div><span className="font-semibold text-slate-700">{lbl.company}:</span> {data.companyName}</div>
              )}
              {!data.hideIncome && data.annualIncome && (
                <div><span className="font-semibold text-slate-700">{lbl.annualIncome}:</span> {data.incomeCurrency || 'INR'} {data.annualIncome}</div>
              )}
              {data.workLocation && (
                <div><span className="font-semibold text-slate-700">{lbl.workLocation}:</span> {data.workLocation}</div>
              )}
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName) && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#800020] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.familyDetails}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
              {data.fatherName && (
                <div><span className="font-semibold text-slate-700">{lbl.fatherName}:</span> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>
              )}
              {data.motherName && (
                <div><span className="font-semibold text-slate-700">{lbl.motherName}:</span> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>
              )}
              <div>
                <span className="font-semibold text-slate-700">{lbl.brothers}:</span> {data.brothersCount} {data.brothersDetails ? `— ${data.brothersDetails}` : ''}
              </div>
              <div>
                <span className="font-semibold text-slate-700">{lbl.sisters}:</span> {data.sistersCount} {data.sistersDetails ? `— ${data.sistersDetails}` : ''}
              </div>
              {data.familyType && (
                <div><span className="font-semibold text-slate-700">{lbl.familyType}:</span> {data.familyType === 'nuclear' ? 'Nuclear' : data.familyType === 'joint' ? 'Joint' : 'Other'}</div>
              )}
              {data.familyNativePlace && (
                <div><span className="font-semibold text-slate-700">{lbl.familyNative}:</span> {data.familyNativePlace}</div>
              )}
              {data.familyResidence && (
                <div className="col-span-2"><span className="font-semibold text-slate-700">{lbl.familyResidence}:</span> {data.familyResidence}</div>
              )}
            </div>

            {data.additionalFamilyMembers?.length > 0 && (
              <div className="mt-2 pl-2 border-t border-slate-200 pt-1.5 space-y-1">
                {data.additionalFamilyMembers.map((m) => (
                  <div key={m.id} className="text-slate-700">
                    <span className="font-semibold">{m.relation}:</span> {m.name} {m.details ? `(${m.details})` : ''}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Horoscope Section (If Enabled) */}
        {data.includeHoroscope && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#800020] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.horoscopeDetails}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 pl-2">
              {data.timeOfBirth && <div><span className="font-semibold text-slate-700">{lbl.timeOfBirth}:</span> {data.timeOfBirth}</div>}
              {data.placeOfBirth && <div><span className="font-semibold text-slate-700">{lbl.placeOfBirth}:</span> {data.placeOfBirth}</div>}
              {data.rashi && <div><span className="font-semibold text-slate-700">{lbl.rashi}:</span> {data.rashi}</div>}
              {data.nakshatra && <div><span className="font-semibold text-slate-700">{lbl.nakshatra}:</span> {data.nakshatra}</div>}
              {data.gotra && <div><span className="font-semibold text-slate-700">{lbl.gotra}:</span> {data.gotra}</div>}
              {data.manglikStatus && <div><span className="font-semibold text-slate-700">{lbl.manglik}:</span> {data.manglikStatus === 'no' ? 'Non-Manglik' : data.manglikStatus === 'yes' ? 'Manglik' : 'Partial'}</div>}
            </div>
          </div>
        )}

        {/* About Me & Lifestyle */}
        {data.aboutMe && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#800020] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.aboutMe}</span>
            </div>
            <p className="text-slate-700 leading-relaxed pl-2 whitespace-pre-line">{data.aboutMe}</p>
            {data.hobbies && data.hobbies.length > 0 && (
              <p className="pl-2 mt-1 text-slate-600">
                <span className="font-semibold text-slate-700">{lbl.hobbies}:</span> {data.hobbies.join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Partner Preferences (If Enabled) */}
        {data.includePartnerPreferences && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#800020] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.partnerPreferences}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
              {(data.partnerAgeMin || data.partnerAgeMax) && (
                <div><span className="font-semibold text-slate-700">{lbl.prefAge}:</span> {data.partnerAgeMin || 18} - {data.partnerAgeMax || 40} {lbl.years}</div>
              )}
              {data.partnerHeightRange && (
                <div><span className="font-semibold text-slate-700">{lbl.prefHeight}:</span> {data.partnerHeightRange}</div>
              )}
              {data.partnerEducation && (
                <div><span className="font-semibold text-slate-700">{lbl.prefEducation}:</span> {data.partnerEducation}</div>
              )}
              {data.partnerLocation && (
                <div><span className="font-semibold text-slate-700">{lbl.prefLocation}:</span> {data.partnerLocation}</div>
              )}
            </div>
            {data.partnerExpectations && (
              <p className="pl-2 mt-1 text-slate-700 italic">"{data.partnerExpectations}"</p>
            )}
          </div>
        )}

        {/* Contact Details (With Visibility Controls) */}
        <div>
          <div className="flex items-center gap-2 mb-2 bg-[#800020] text-amber-100 px-3 py-1 rounded-sm">
            <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.contactDetails}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
            {data.contactPersonName && (
              <div><span className="font-semibold text-slate-700">{lbl.contactPerson}:</span> {data.contactPersonName} {data.relationship ? `(${data.relationship})` : ''}</div>
            )}
            {data.showPhone && data.primaryPhone && (
              <div><span className="font-semibold text-slate-700">{lbl.phone}:</span> {data.primaryPhone} {data.alternatePhone ? `/ ${data.alternatePhone}` : ''}</div>
            )}
            {data.showEmail && data.email && (
              <div><span className="font-semibold text-slate-700">{lbl.email}:</span> {data.email}</div>
            )}
            {data.showAddress && data.residentialAddress && (
              <div className="col-span-2"><span className="font-semibold text-slate-700">{lbl.address}:</span> {data.residentialAddress}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
