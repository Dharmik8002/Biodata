import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, GoldDivider } from './templateUtils';

export const RoyalBlueGold: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div className="relative w-full h-full bg-[#FAFBFD] text-slate-800 p-8 sm:p-10 font-sans shadow-sm border-[5px] border-[#0F274E] box-border">
      {/* Inner Accent Gold Border */}
      <div className="absolute inset-1.5 border border-[#D4AF37] pointer-events-none" />

      {/* Royal Navy Header Bar */}
      <div className="bg-[#0F274E] text-white p-5 rounded-lg border-2 border-[#D4AF37] mb-6 text-center shadow-sm">
        {data.religiousHeading && (
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-1 font-marcellus">
            {data.religiousHeading}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-amber-100 font-cinzel">
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color="#D4AF37" />
      </div>

      {/* Profile Overview (Photo + Core Details) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-5 rounded-lg border border-[#D4AF37]/50 shadow-xs mb-6">
        {data.photoUrl && (
          <div className="shrink-0 p-1 bg-[#0F274E] rounded-xl border-2 border-[#D4AF37]">
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
          <h2 className="text-2xl font-bold text-[#0F274E] font-playfair tracking-wide">
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-slate-600 font-medium">"{data.profileHeadline}"</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-1.5 border-t border-[#D4AF37]/40">
            {data.dateOfBirth && (
              <div>
                <span className="font-semibold text-[#0F274E]">{lbl.dateOfBirth}:</span> {data.dateOfBirth} {data.age > 0 ? `(${data.age} yrs)` : ''}
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="font-semibold text-[#0F274E]">{lbl.height}:</span> {data.heightFeet}
              </div>
            )}
            {data.religion && (
              <div>
                <span className="font-semibold text-[#0F274E]">{lbl.religion}:</span> {data.religion} {data.caste ? `(${data.caste})` : ''}
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="font-semibold text-[#0F274E]">{lbl.motherTongue}:</span> {data.motherTongue}
              </div>
            )}
            {data.currentCity && (
              <div className="col-span-2">
                <span className="font-semibold text-[#0F274E]">{lbl.currentLocation}:</span> {[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4 text-xs">
        {/* Education & Career */}
        {(data.highestQualification || data.occupation) && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#0F274E] text-[#D4AF37] px-3 py-1 rounded-sm border-l-4 border-[#D4AF37]">
              <span className="font-cinzel font-bold tracking-wider uppercase text-amber-200">{lbl.educationCareer}</span>
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
                <div><span className="font-semibold text-slate-700">{lbl.annualIncome}:</span> {data.annualIncome}</div>
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
            <div className="flex items-center gap-2 mb-2 bg-[#0F274E] text-[#D4AF37] px-3 py-1 rounded-sm border-l-4 border-[#D4AF37]">
              <span className="font-cinzel font-bold tracking-wider uppercase text-amber-200">{lbl.familyDetails}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
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
              {data.familyType && (
                <div><span className="font-semibold text-slate-700">{lbl.familyType}:</span> {data.familyType}</div>
              )}
              {data.familyResidence && (
                <div className="col-span-2"><span className="font-semibold text-slate-700">{lbl.familyResidence}:</span> {data.familyResidence}</div>
              )}
            </div>
          </div>
        )}

        {/* Horoscope (Optional) */}
        {data.includeHoroscope && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#0F274E] text-[#D4AF37] px-3 py-1 rounded-sm border-l-4 border-[#D4AF37]">
              <span className="font-cinzel font-bold tracking-wider uppercase text-amber-200">{lbl.horoscopeDetails}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 pl-2">
              {data.timeOfBirth && <div><span className="font-semibold text-slate-700">{lbl.timeOfBirth}:</span> {data.timeOfBirth}</div>}
              {data.placeOfBirth && <div><span className="font-semibold text-slate-700">{lbl.placeOfBirth}:</span> {data.placeOfBirth}</div>}
              {data.rashi && <div><span className="font-semibold text-slate-700">{lbl.rashi}:</span> {data.rashi}</div>}
              {data.gotra && <div><span className="font-semibold text-slate-700">{lbl.gotra}:</span> {data.gotra}</div>}
              {data.manglikStatus && <div><span className="font-semibold text-slate-700">{lbl.manglik}:</span> {data.manglikStatus}</div>}
            </div>
          </div>
        )}

        {/* About Me */}
        {data.aboutMe && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#0F274E] text-[#D4AF37] px-3 py-1 rounded-sm border-l-4 border-[#D4AF37]">
              <span className="font-cinzel font-bold tracking-wider uppercase text-amber-200">{lbl.aboutMe}</span>
            </div>
            <p className="text-slate-700 leading-relaxed pl-2 whitespace-pre-line">{data.aboutMe}</p>
          </div>
        )}

        {/* Contact Details */}
        <div>
          <div className="flex items-center gap-2 mb-2 bg-[#0F274E] text-[#D4AF37] px-3 py-1 rounded-sm border-l-4 border-[#D4AF37]">
            <span className="font-cinzel font-bold tracking-wider uppercase text-amber-200">{lbl.contactDetails}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
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
