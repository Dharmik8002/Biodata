import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, GaneshaIcon, GoldDivider } from './templateUtils';

export const HinduTraditional: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div className="relative w-full h-full bg-[#FFFBF5] text-slate-900 p-8 sm:p-10 font-sans shadow-sm border-[6px] border-[#991B1B] box-border">
      {/* Haldi & Gold Inset */}
      <div className="absolute inset-1.5 border-2 border-[#D97706] pointer-events-none" />

      {/* Header */}
      <div className="text-center relative z-10 mb-6">
        <div className="flex justify-center mb-1">
          <GaneshaIcon className="w-10 h-10" color="#991B1B" />
        </div>
        <p className="text-xs font-bold text-[#991B1B] tracking-wider mb-1 font-devanagari">
          {data.religiousHeading || '|| श्री गणेशाय नमः ||'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-[#991B1B] font-cinzel">
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color="#D97706" />
      </div>

      {/* Top Banner with Photo */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-[#FEF3C7]/40 p-5 rounded-lg border border-[#D97706]/40 mb-6 shadow-xs relative z-10">
        {data.photoUrl && (
          <div className="shrink-0 p-1 bg-[#991B1B] rounded-xl border-2 border-[#D97706]">
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
          <h2 className="text-2xl font-bold text-[#991B1B] font-playfair tracking-wide">
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-slate-700 font-medium">"{data.profileHeadline}"</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-1.5 border-t border-[#D97706]/30">
            {data.dateOfBirth && (
              <div>
                <span className="font-semibold text-[#991B1B]">{lbl.dateOfBirth}:</span> {data.dateOfBirth} {data.age > 0 ? `(${data.age} yrs)` : ''}
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="font-semibold text-[#991B1B]">{lbl.height}:</span> {data.heightFeet}
              </div>
            )}
            {data.religion && (
              <div>
                <span className="font-semibold text-[#991B1B]">{lbl.religion}:</span> {data.religion} {data.caste ? `(${data.caste})` : ''}
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="font-semibold text-[#991B1B]">{lbl.motherTongue}:</span> {data.motherTongue}
              </div>
            )}
            {data.nativePlace && (
              <div>
                <span className="font-semibold text-[#991B1B]">{lbl.nativePlace}:</span> {data.nativePlace}
              </div>
            )}
            {data.currentCity && (
              <div>
                <span className="font-semibold text-[#991B1B]">{lbl.currentLocation}:</span> {[data.currentCity, data.currentState].filter(Boolean).join(', ')}
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
            <div className="flex items-center gap-2 mb-2 bg-[#991B1B] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.educationCareer}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
              {data.highestQualification && (
                <div><span className="font-semibold text-slate-800">{lbl.highestQualification}:</span> {data.highestQualification}</div>
              )}
              {data.degree && (
                <div><span className="font-semibold text-slate-800">{lbl.degree}:</span> {data.degree}</div>
              )}
              {data.collegeUniversity && (
                <div><span className="font-semibold text-slate-800">{lbl.college}:</span> {data.collegeUniversity}</div>
              )}
              {data.occupation && (
                <div><span className="font-semibold text-slate-800">{lbl.occupation}:</span> {data.occupation}</div>
              )}
              {data.jobTitle && (
                <div><span className="font-semibold text-slate-800">{lbl.jobTitle}:</span> {data.jobTitle}</div>
              )}
              {!data.hideEmployer && data.companyName && (
                <div><span className="font-semibold text-slate-800">{lbl.company}:</span> {data.companyName}</div>
              )}
              {!data.hideIncome && data.annualIncome && (
                <div><span className="font-semibold text-slate-800">{lbl.annualIncome}:</span> {data.annualIncome}</div>
              )}
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName) && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#991B1B] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.familyDetails}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
              {data.fatherName && (
                <div><span className="font-semibold text-slate-800">{lbl.fatherName}:</span> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>
              )}
              {data.motherName && (
                <div><span className="font-semibold text-slate-800">{lbl.motherName}:</span> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>
              )}
              <div>
                <span className="font-semibold text-slate-800">{lbl.brothers}:</span> {data.brothersCount} {data.brothersDetails ? `(${data.brothersDetails})` : ''}
              </div>
              <div>
                <span className="font-semibold text-slate-800">{lbl.sisters}:</span> {data.sistersCount} {data.sistersDetails ? `(${data.sistersDetails})` : ''}
              </div>
              {data.familyResidence && (
                <div className="col-span-2"><span className="font-semibold text-slate-800">{lbl.familyResidence}:</span> {data.familyResidence}</div>
              )}
            </div>
          </div>
        )}

        {/* Horoscope (Vedic Prominence) */}
        {data.includeHoroscope && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#991B1B] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.horoscopeDetails}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 pl-2">
              {data.timeOfBirth && <div><span className="font-semibold text-slate-800">{lbl.timeOfBirth}:</span> {data.timeOfBirth}</div>}
              {data.placeOfBirth && <div><span className="font-semibold text-slate-800">{lbl.placeOfBirth}:</span> {data.placeOfBirth}</div>}
              {data.rashi && <div><span className="font-semibold text-slate-800">{lbl.rashi}:</span> {data.rashi}</div>}
              {data.nakshatra && <div><span className="font-semibold text-slate-800">{lbl.nakshatra}:</span> {data.nakshatra}</div>}
              {data.gotra && <div><span className="font-semibold text-slate-800">{lbl.gotra}:</span> {data.gotra}</div>}
              {data.manglikStatus && <div><span className="font-semibold text-slate-800">{lbl.manglik}:</span> {data.manglikStatus}</div>}
            </div>
          </div>
        )}

        {/* About Me */}
        {data.aboutMe && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#991B1B] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.aboutMe}</span>
            </div>
            <p className="text-slate-800 leading-relaxed pl-2 whitespace-pre-line">{data.aboutMe}</p>
          </div>
        )}

        {/* Contact Details */}
        <div>
          <div className="flex items-center gap-2 mb-2 bg-[#991B1B] text-amber-100 px-3 py-1 rounded-sm">
            <span className="font-cinzel font-bold tracking-wider uppercase">{lbl.contactDetails}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
            {data.contactPersonName && (
              <div><span className="font-semibold text-slate-800">{lbl.contactPerson}:</span> {data.contactPersonName} {data.relationship ? `(${data.relationship})` : ''}</div>
            )}
            {data.showPhone && data.primaryPhone && (
              <div><span className="font-semibold text-slate-800">{lbl.phone}:</span> {data.primaryPhone}</div>
            )}
            {data.showEmail && data.email && (
              <div><span className="font-semibold text-slate-800">{lbl.email}:</span> {data.email}</div>
            )}
            {data.showAddress && data.residentialAddress && (
              <div className="col-span-2"><span className="font-semibold text-slate-800">{lbl.address}:</span> {data.residentialAddress}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
