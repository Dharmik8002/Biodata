import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, GaneshaIcon, GoldDivider } from './templateUtils';

export const GujaratiTraditional: React.FC<{ data: BiodataData }> = ({ data }) => {
  // Use Gujarati document labels by default for this template if language is gu, or data.language
  const lbl = getDocLabels(data.language === 'en' ? 'gu' : data.language);

  return (
    <div className="relative w-full h-full bg-[#FFFDF5] text-slate-900 p-8 sm:p-10 font-gujarati shadow-sm border-[6px] border-[#B91C1C] box-border">
      {/* Saffron and Gold Inset Borders */}
      <div className="absolute inset-1.5 border-2 border-[#F59E0B] pointer-events-none" />
      <div className="absolute inset-3 border border-[#B91C1C]/20 pointer-events-none" />

      {/* Header */}
      <div className="text-center relative z-10 mb-6">
        <div className="flex justify-center mb-1">
          <GaneshaIcon className="w-9 h-9" color="#B91C1C" />
        </div>
        <p className="text-sm font-bold text-[#B91C1C] tracking-wide mb-1">
          {data.religiousHeading || '|| શ્રી ગણેશાય નમઃ ||'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#B91C1C]">
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color="#F59E0B" />
      </div>

      {/* Profile Card */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-[#FEF3C7]/40 p-5 rounded-xl border border-[#F59E0B]/50 mb-6 shadow-xs relative z-10">
        {data.photoUrl && (
          <div className="shrink-0 p-1 bg-[#B91C1C] rounded-xl border-2 border-[#F59E0B] shadow-sm">
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className={`w-28 h-36 object-cover ${
                data.photoStyle === 'circle' ? 'rounded-full' : 'rounded-lg'
              }`}
            />
          </div>
        )}

        <div className="flex-1 space-y-1.5 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#B91C1C] tracking-wide font-sans">
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-slate-700">"{data.profileHeadline}"</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-1.5 border-t border-[#F59E0B]/40">
            {data.dateOfBirth && (
              <div>
                <span className="font-bold text-[#B91C1C]">{lbl.dateOfBirth}:</span> {data.dateOfBirth} {data.age > 0 ? `(${data.age} ${lbl.years})` : ''}
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="font-bold text-[#B91C1C]">{lbl.height}:</span> {data.heightFeet}
              </div>
            )}
            {data.religion && (
              <div>
                <span className="font-bold text-[#B91C1C]">{lbl.religion}:</span> {data.religion} {data.caste ? `(${data.caste})` : ''}
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="font-bold text-[#B91C1C]">{lbl.motherTongue}:</span> {data.motherTongue}
              </div>
            )}
            {data.nativePlace && (
              <div>
                <span className="font-bold text-[#B91C1C]">{lbl.nativePlace}:</span> {data.nativePlace}
              </div>
            )}
            {data.currentCity && (
              <div>
                <span className="font-bold text-[#B91C1C]">{lbl.currentLocation}:</span> {[data.currentCity, data.currentState].filter(Boolean).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4 text-xs relative z-10">
        {/* Education & Career */}
        {(data.highestQualification || data.occupation) && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#B91C1C] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-bold tracking-wider">{lbl.educationCareer}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
              {data.highestQualification && (
                <div><span className="font-bold text-slate-800">{lbl.highestQualification}:</span> {data.highestQualification}</div>
              )}
              {data.degree && (
                <div><span className="font-bold text-slate-800">{lbl.degree}:</span> {data.degree}</div>
              )}
              {data.collegeUniversity && (
                <div><span className="font-bold text-slate-800">{lbl.college}:</span> {data.collegeUniversity}</div>
              )}
              {data.occupation && (
                <div><span className="font-bold text-slate-800">{lbl.occupation}:</span> {data.occupation}</div>
              )}
              {data.jobTitle && (
                <div><span className="font-bold text-slate-800">{lbl.jobTitle}:</span> {data.jobTitle}</div>
              )}
              {!data.hideEmployer && data.companyName && (
                <div><span className="font-bold text-slate-800">{lbl.company}:</span> {data.companyName}</div>
              )}
              {!data.hideIncome && data.annualIncome && (
                <div><span className="font-bold text-slate-800">{lbl.annualIncome}:</span> {data.annualIncome}</div>
              )}
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName) && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#B91C1C] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-bold tracking-wider">{lbl.familyDetails}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
              {data.fatherName && (
                <div><span className="font-bold text-slate-800">{lbl.fatherName}:</span> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>
              )}
              {data.motherName && (
                <div><span className="font-bold text-slate-800">{lbl.motherName}:</span> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>
              )}
              <div>
                <span className="font-bold text-slate-800">{lbl.brothers}:</span> {data.brothersCount} {data.brothersDetails ? `(${data.brothersDetails})` : ''}
              </div>
              <div>
                <span className="font-bold text-slate-800">{lbl.sisters}:</span> {data.sistersCount} {data.sistersDetails ? `(${data.sistersDetails})` : ''}
              </div>
              {data.familyNativePlace && (
                <div><span className="font-bold text-slate-800">{lbl.familyNative}:</span> {data.familyNativePlace}</div>
              )}
              {data.familyResidence && (
                <div className="col-span-2"><span className="font-bold text-slate-800">{lbl.familyResidence}:</span> {data.familyResidence}</div>
              )}
            </div>
          </div>
        )}

        {/* Horoscope (Optional) */}
        {data.includeHoroscope && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#B91C1C] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-bold tracking-wider">{lbl.horoscopeDetails}</span>
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 pl-2">
              {data.timeOfBirth && <div><span className="font-bold text-slate-800">{lbl.timeOfBirth}:</span> {data.timeOfBirth}</div>}
              {data.placeOfBirth && <div><span className="font-bold text-slate-800">{lbl.placeOfBirth}:</span> {data.placeOfBirth}</div>}
              {data.rashi && <div><span className="font-bold text-slate-800">{lbl.rashi}:</span> {data.rashi}</div>}
              {data.nakshatra && <div><span className="font-bold text-slate-800">{lbl.nakshatra}:</span> {data.nakshatra}</div>}
              {data.gotra && <div><span className="font-bold text-slate-800">{lbl.gotra}:</span> {data.gotra}</div>}
              {data.manglikStatus && <div><span className="font-bold text-slate-800">{lbl.manglik}:</span> {data.manglikStatus}</div>}
            </div>
          </div>
        )}

        {/* About Me */}
        {data.aboutMe && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#B91C1C] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-bold tracking-wider">{lbl.aboutMe}</span>
            </div>
            <p className="text-slate-800 leading-relaxed pl-2 whitespace-pre-line">{data.aboutMe}</p>
          </div>
        )}

        {/* Contact Details */}
        <div>
          <div className="flex items-center gap-2 mb-2 bg-[#B91C1C] text-amber-100 px-3 py-1 rounded-sm">
            <span className="font-bold tracking-wider">{lbl.contactDetails}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
            {data.contactPersonName && (
              <div><span className="font-bold text-slate-800">{lbl.contactPerson}:</span> {data.contactPersonName} {data.relationship ? `(${data.relationship})` : ''}</div>
            )}
            {data.showPhone && data.primaryPhone && (
              <div><span className="font-bold text-slate-800">{lbl.phone}:</span> {data.primaryPhone}</div>
            )}
            {data.showEmail && data.email && (
              <div><span className="font-bold text-slate-800">{lbl.email}:</span> {data.email}</div>
            )}
            {data.showAddress && data.residentialAddress && (
              <div className="col-span-2"><span className="font-bold text-slate-800">{lbl.address}:</span> {data.residentialAddress}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
