import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels } from './templateUtils';

export const SoftPink: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div className="relative w-full h-full bg-[#FFF5F7] text-slate-800 p-8 sm:p-10 font-sans shadow-sm border-[4px] border-[#F472B6]/40 box-border">
      {/* Decorative Subtle Header */}
      <div className="text-center mb-6 border-b border-[#F472B6]/30 pb-4">
        {data.religiousHeading && (
          <p className="text-xs font-semibold text-[#BE185D] tracking-widest uppercase mb-1">
            {data.religiousHeading}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#BE185D] font-playfair">
          {data.title || lbl.marriageBiodata}
        </h1>
      </div>

      {/* Top Banner with Photo */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white/80 p-5 rounded-xl border border-[#FBCFE8] mb-6 shadow-xs">
        {data.photoUrl && (
          <div className="shrink-0 p-1 bg-[#FDF2F8] rounded-xl border-2 border-[#F472B6]">
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className={`w-28 h-36 object-cover ${
                data.photoStyle === 'circle' ? 'rounded-full' : 'rounded-lg'
              }`}
            />
          </div>
        )}

        <div className="flex-1 space-y-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#9D174D] font-playfair">{data.fullName}</h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-[#BE185D]">"{data.profileHeadline}"</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-2">
            {data.dateOfBirth && (
              <div>
                <span className="font-semibold text-[#BE185D]">{lbl.dateOfBirth}:</span> {data.dateOfBirth} {data.age > 0 ? `(${data.age} yrs)` : ''}
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="font-semibold text-[#BE185D]">{lbl.height}:</span> {data.heightFeet}
              </div>
            )}
            {data.religion && (
              <div>
                <span className="font-semibold text-[#BE185D]">{lbl.religion}:</span> {data.religion} {data.caste ? `(${data.caste})` : ''}
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="font-semibold text-[#BE185D]">{lbl.motherTongue}:</span> {data.motherTongue}
              </div>
            )}
            {data.currentCity && (
              <div className="col-span-2">
                <span className="font-semibold text-[#BE185D]">{lbl.currentLocation}:</span> {[data.currentCity, data.currentState].filter(Boolean).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-4 text-xs">
        {/* Education & Career */}
        {(data.highestQualification || data.occupation) && (
          <div className="bg-white/80 p-4 rounded-xl border border-[#FBCFE8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9D174D] mb-2 font-playfair border-b border-[#FBCFE8] pb-1">
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
          <div className="bg-white/80 p-4 rounded-xl border border-[#FBCFE8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9D174D] mb-2 font-playfair border-b border-[#FBCFE8] pb-1">
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
          <div className="bg-white/80 p-4 rounded-xl border border-[#FBCFE8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9D174D] mb-2 font-playfair border-b border-[#FBCFE8] pb-1">
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
          <div className="bg-white/80 p-4 rounded-xl border border-[#FBCFE8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9D174D] mb-2 font-playfair border-b border-[#FBCFE8] pb-1">
              {lbl.aboutMe}
            </h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{data.aboutMe}</p>
          </div>
        )}

        {/* Contact Details */}
        <div className="bg-white/80 p-4 rounded-xl border border-[#FBCFE8]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#9D174D] mb-2 font-playfair border-b border-[#FBCFE8] pb-1">
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
