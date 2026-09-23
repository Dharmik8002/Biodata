import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, FloralCorner } from './templateUtils';

export const ElegantFloral: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div className="relative w-full h-full bg-[#FCF8F7] text-slate-800 p-8 sm:p-10 font-sans shadow-sm border-[4px] border-[#D9AAB0] box-border">
      {/* Corner florals */}
      <div className="absolute top-3 left-3"><FloralCorner className="w-12 h-12 text-[#B96A76]" /></div>
      <div className="absolute top-3 right-3 rotate-90"><FloralCorner className="w-12 h-12 text-[#B96A76]" /></div>
      <div className="absolute bottom-3 left-3 -rotate-90"><FloralCorner className="w-12 h-12 text-[#B96A76]" /></div>
      <div className="absolute bottom-3 right-3 rotate-180"><FloralCorner className="w-12 h-12 text-[#B96A76]" /></div>

      {/* Header */}
      <div className="text-center relative z-10 mb-6">
        {data.religiousHeading && (
          <p className="text-xs font-medium text-[#9D4E5B] tracking-widest uppercase mb-1">
            {data.religiousHeading}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#9D4E5B] font-playfair">
          {data.title || lbl.marriageBiodata}
        </h1>
        <div className="w-24 h-[1.5px] bg-[#D9AAB0] mx-auto mt-2" />
      </div>

      {/* Top Banner with Circular/Soft Portrait */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white/70 p-5 rounded-2xl border border-[#D9AAB0]/40 mb-6 shadow-xs relative z-10">
        {data.photoUrl && (
          <div className="shrink-0 p-1 rounded-full bg-gradient-to-tr from-[#9D4E5B] to-[#F2CDD2] shadow-sm">
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className="w-28 h-28 object-cover rounded-full"
            />
          </div>
        )}

        <div className="flex-1 space-y-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#833845] font-playfair">{data.fullName}</h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-[#9D4E5B]">"{data.profileHeadline}"</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-2">
            {data.dateOfBirth && (
              <div>
                <span className="font-semibold text-[#833845]">{lbl.dateOfBirth}:</span> {data.dateOfBirth} {data.age > 0 ? `(${data.age} yrs)` : ''}
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="font-semibold text-[#833845]">{lbl.height}:</span> {data.heightFeet}
              </div>
            )}
            {data.religion && (
              <div>
                <span className="font-semibold text-[#833845]">{lbl.religion}:</span> {data.religion} {data.caste ? `(${data.caste})` : ''}
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="font-semibold text-[#833845]">{lbl.motherTongue}:</span> {data.motherTongue}
              </div>
            )}
            {data.currentCity && (
              <div className="col-span-2">
                <span className="font-semibold text-[#833845]">{lbl.currentLocation}:</span> {[data.currentCity, data.currentState].filter(Boolean).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 text-xs relative z-10">
        {/* Education & Career */}
        {(data.highestQualification || data.occupation) && (
          <div className="bg-white/60 p-4 rounded-xl border border-[#D9AAB0]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#833845] mb-2 font-playfair border-b border-[#D9AAB0]/40 pb-1">
              {lbl.educationCareer}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {data.highestQualification && (
                <div><span className="font-semibold text-slate-700">{lbl.highestQualification}:</span> {data.highestQualification}</div>
              )}
              {data.degree && (
                <div><span className="font-semibold text-slate-700">{lbl.degree}:</span> {data.degree}</div>
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
                <div><span className="font-semibold text-slate-700">{lbl.annualIncome}:</span> {data.annualIncome}</div>
              )}
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName) && (
          <div className="bg-white/60 p-4 rounded-xl border border-[#D9AAB0]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#833845] mb-2 font-playfair border-b border-[#D9AAB0]/40 pb-1">
              {lbl.familyDetails}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {data.fatherName && (
                <div><span className="font-semibold text-slate-700">{lbl.fatherName}:</span> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>
              )}
              {data.motherName && (
                <div><span className="font-semibold text-slate-700">{lbl.motherName}:</span> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>
              )}
              <div>
                <span className="font-semibold text-slate-700">{lbl.brothers}:</span> {data.brothersCount} {data.brothersDetails ? `(${data.brothersDetails})` : ''}
              </div>
              <div>
                <span className="font-semibold text-slate-700">{lbl.sisters}:</span> {data.sistersCount} {data.sistersDetails ? `(${data.sistersDetails})` : ''}
              </div>
              {data.familyResidence && (
                <div className="col-span-2"><span className="font-semibold text-slate-700">{lbl.familyResidence}:</span> {data.familyResidence}</div>
              )}
            </div>
          </div>
        )}

        {/* Horoscope (Optional) */}
        {data.includeHoroscope && (
          <div className="bg-white/60 p-4 rounded-xl border border-[#D9AAB0]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#833845] mb-2 font-playfair border-b border-[#D9AAB0]/40 pb-1">
              {lbl.horoscopeDetails}
            </h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
              {data.timeOfBirth && <div><span className="font-semibold text-slate-700">{lbl.timeOfBirth}:</span> {data.timeOfBirth}</div>}
              {data.rashi && <div><span className="font-semibold text-slate-700">{lbl.rashi}:</span> {data.rashi}</div>}
              {data.nakshatra && <div><span className="font-semibold text-slate-700">{lbl.nakshatra}:</span> {data.nakshatra}</div>}
            </div>
          </div>
        )}

        {/* About Me */}
        {data.aboutMe && (
          <div className="bg-white/60 p-4 rounded-xl border border-[#D9AAB0]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#833845] mb-2 font-playfair border-b border-[#D9AAB0]/40 pb-1">
              {lbl.aboutMe}
            </h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{data.aboutMe}</p>
          </div>
        )}

        {/* Contact Details */}
        <div className="bg-white/60 p-4 rounded-xl border border-[#D9AAB0]/30">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#833845] mb-2 font-playfair border-b border-[#D9AAB0]/40 pb-1">
            {lbl.contactDetails}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {data.contactPersonName && (
              <div><span className="font-semibold text-slate-700">{lbl.contactPerson}:</span> {data.contactPersonName} {data.relationship ? `(${data.relationship})` : ''}</div>
            )}
            {data.showPhone && data.primaryPhone && (
              <div><span className="font-semibold text-slate-700">{lbl.phone}:</span> {data.primaryPhone}</div>
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
