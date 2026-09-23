import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, BismillahIcon, GoldDivider } from './templateUtils';

export const MuslimElegant: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div className="relative w-full h-full bg-[#FAFBF9] text-slate-800 p-8 sm:p-10 font-sans shadow-sm border-[6px] border-[#065F46] box-border">
      {/* Subtle Inset Gold Border */}
      <div className="absolute inset-1.5 border border-[#FBBF24] pointer-events-none" />

      {/* Header */}
      <div className="text-center relative z-10 mb-6">
        <div className="flex justify-center mb-1">
          <BismillahIcon className="w-24 h-10" color="#065F46" />
        </div>
        <p className="text-xs font-semibold text-[#065F46] tracking-wider uppercase mb-1 font-marcellus">
          {data.religiousHeading || '|| In the Name of Allah, Most Gracious, Most Merciful ||'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-[#065F46] font-cinzel">
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color="#FBBF24" />
      </div>

      {/* Top Banner with Photo */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-5 rounded-lg border border-[#065F46]/30 mb-6 shadow-xs relative z-10">
        {data.photoUrl && (
          <div className="shrink-0 p-1 bg-[#065F46] rounded-xl border-2 border-[#FBBF24]">
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
          <h2 className="text-2xl font-bold text-[#065F46] font-playfair tracking-wide">
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-slate-600 font-medium">"{data.profileHeadline}"</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-1.5 border-t border-[#065F46]/20">
            {data.dateOfBirth && (
              <div>
                <span className="font-semibold text-[#065F46]">{lbl.dateOfBirth}:</span> {data.dateOfBirth} {data.age > 0 ? `(${data.age} yrs)` : ''}
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="font-semibold text-[#065F46]">{lbl.height}:</span> {data.heightFeet}
              </div>
            )}
            {data.religion && (
              <div>
                <span className="font-semibold text-[#065F46]">{lbl.religion}:</span> {data.religion} {data.caste ? `(${data.caste})` : ''}
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="font-semibold text-[#065F46]">{lbl.motherTongue}:</span> {data.motherTongue}
              </div>
            )}
            {data.currentCity && (
              <div className="col-span-2">
                <span className="font-semibold text-[#065F46]">{lbl.currentLocation}:</span> {[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}
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
            <div className="flex items-center gap-2 mb-2 bg-[#065F46] text-amber-100 px-3 py-1 rounded-sm">
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
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName) && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#065F46] text-amber-100 px-3 py-1 rounded-sm">
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
              {data.familyResidence && (
                <div className="col-span-2"><span className="font-semibold text-slate-700">{lbl.familyResidence}:</span> {data.familyResidence}</div>
              )}
            </div>
          </div>
        )}

        {/* About Me & Religious Values */}
        {data.aboutMe && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#065F46] text-amber-100 px-3 py-1 rounded-sm">
              <span className="font-cinzel font-bold tracking-wider uppercase text-amber-200">{lbl.aboutMe}</span>
            </div>
            <p className="text-slate-700 leading-relaxed pl-2 whitespace-pre-line">{data.aboutMe}</p>
          </div>
        )}

        {/* Contact Details */}
        <div>
          <div className="flex items-center gap-2 mb-2 bg-[#065F46] text-amber-100 px-3 py-1 rounded-sm">
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
