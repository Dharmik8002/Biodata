import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, GoldDivider } from './templateUtils';

export const IvoryChampagne: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div className="relative w-full h-full bg-[#FFFDF8] text-amber-950 p-8 sm:p-10 font-sans shadow-sm border-[6px] border-[#D4AF37]/80 box-border">
      {/* Embossed inner border */}
      <div className="absolute inset-2 border-2 border-[#D4AF37]/30 pointer-events-none" />

      {/* Header */}
      <div className="text-center relative z-10 mb-6">
        {data.religiousHeading && (
          <p className="text-xs font-semibold text-[#B45309] tracking-widest uppercase mb-1 font-marcellus">
            {data.religiousHeading}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-[#78350F] font-cinzel">
          {data.title || lbl.marriageBiodata}
        </h1>
        <GoldDivider color="#D4AF37" />
      </div>

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-[#FEF9EE] p-5 rounded-lg border border-[#D4AF37]/40 mb-6 shadow-xs relative z-10">
        {data.photoUrl && (
          <div className="shrink-0 p-1 bg-white rounded-lg border-2 border-[#D4AF37] shadow-sm">
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className={`w-28 h-36 object-cover ${
                data.photoStyle === 'circle' ? 'rounded-full' : 'rounded-md'
              }`}
            />
          </div>
        )}

        <div className="flex-1 space-y-1.5 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#78350F] font-playfair tracking-wide">
            {data.fullName}
          </h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-[#B45309]">"{data.profileHeadline}"</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-1.5 border-t border-[#D4AF37]/30">
            {data.dateOfBirth && (
              <div>
                <span className="font-semibold text-[#78350F]">{lbl.dateOfBirth}:</span> {data.dateOfBirth} {data.age > 0 ? `(${data.age} yrs)` : ''}
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="font-semibold text-[#78350F]">{lbl.height}:</span> {data.heightFeet}
              </div>
            )}
            {data.religion && (
              <div>
                <span className="font-semibold text-[#78350F]">{lbl.religion}:</span> {data.religion} {data.caste ? `(${data.caste})` : ''}
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="font-semibold text-[#78350F]">{lbl.motherTongue}:</span> {data.motherTongue}
              </div>
            )}
            {data.currentCity && (
              <div className="col-span-2">
                <span className="font-semibold text-[#78350F]">{lbl.currentLocation}:</span> {[data.currentCity, data.currentState].filter(Boolean).join(', ')}
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
            <div className="flex items-center gap-2 mb-2 bg-[#FEF9EE] border-l-4 border-[#D4AF37] px-3 py-1">
              <span className="font-cinzel font-bold tracking-wider uppercase text-[#78350F]">{lbl.educationCareer}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
              {data.highestQualification && (
                <div><span className="font-semibold text-amber-900">{lbl.highestQualification}:</span> {data.highestQualification}</div>
              )}
              {data.degree && (
                <div><span className="font-semibold text-amber-900">{lbl.degree}:</span> {data.degree}</div>
              )}
              {data.occupation && (
                <div><span className="font-semibold text-amber-900">{lbl.occupation}:</span> {data.occupation}</div>
              )}
              {data.jobTitle && (
                <div><span className="font-semibold text-amber-900">{lbl.jobTitle}:</span> {data.jobTitle}</div>
              )}
              {!data.hideEmployer && data.companyName && (
                <div><span className="font-semibold text-amber-900">{lbl.company}:</span> {data.companyName}</div>
              )}
              {!data.hideIncome && data.annualIncome && (
                <div><span className="font-semibold text-amber-900">{lbl.annualIncome}:</span> {data.annualIncome}</div>
              )}
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName) && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#FEF9EE] border-l-4 border-[#D4AF37] px-3 py-1">
              <span className="font-cinzel font-bold tracking-wider uppercase text-[#78350F]">{lbl.familyDetails}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
              {data.fatherName && (
                <div><span className="font-semibold text-amber-900">{lbl.fatherName}:</span> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>
              )}
              {data.motherName && (
                <div><span className="font-semibold text-amber-900">{lbl.motherName}:</span> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>
              )}
              <div>
                <span className="font-semibold text-amber-900">{lbl.brothers}:</span> {data.brothersCount} {data.brothersDetails ? `(${data.brothersDetails})` : ''}
              </div>
              <div>
                <span className="font-semibold text-amber-900">{lbl.sisters}:</span> {data.sistersCount} {data.sistersDetails ? `(${data.sistersDetails})` : ''}
              </div>
              {data.familyResidence && (
                <div className="col-span-2"><span className="font-semibold text-amber-900">{lbl.familyResidence}:</span> {data.familyResidence}</div>
              )}
            </div>
          </div>
        )}

        {/* Horoscope (Optional) */}
        {data.includeHoroscope && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#FEF9EE] border-l-4 border-[#D4AF37] px-3 py-1">
              <span className="font-cinzel font-bold tracking-wider uppercase text-[#78350F]">{lbl.horoscopeDetails}</span>
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 pl-2">
              {data.timeOfBirth && <div><span className="font-semibold text-amber-900">{lbl.timeOfBirth}:</span> {data.timeOfBirth}</div>}
              {data.rashi && <div><span className="font-semibold text-amber-900">{lbl.rashi}:</span> {data.rashi}</div>}
              {data.gotra && <div><span className="font-semibold text-amber-900">{lbl.gotra}:</span> {data.gotra}</div>}
            </div>
          </div>
        )}

        {/* About Me */}
        {data.aboutMe && (
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#FEF9EE] border-l-4 border-[#D4AF37] px-3 py-1">
              <span className="font-cinzel font-bold tracking-wider uppercase text-[#78350F]">{lbl.aboutMe}</span>
            </div>
            <p className="text-amber-950 leading-relaxed pl-2 whitespace-pre-line">{data.aboutMe}</p>
          </div>
        )}

        {/* Contact Details */}
        <div>
          <div className="flex items-center gap-2 mb-2 bg-[#FEF9EE] border-l-4 border-[#D4AF37] px-3 py-1">
            <span className="font-cinzel font-bold tracking-wider uppercase text-[#78350F]">{lbl.contactDetails}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-2">
            {data.contactPersonName && (
              <div><span className="font-semibold text-amber-900">{lbl.contactPerson}:</span> {data.contactPersonName} {data.relationship ? `(${data.relationship})` : ''}</div>
            )}
            {data.showPhone && data.primaryPhone && (
              <div><span className="font-semibold text-amber-900">{lbl.phone}:</span> {data.primaryPhone}</div>
            )}
            {data.showEmail && data.email && (
              <div><span className="font-semibold text-amber-900">{lbl.email}:</span> {data.email}</div>
            )}
            {data.showAddress && data.residentialAddress && (
              <div className="col-span-2"><span className="font-semibold text-amber-900">{lbl.address}:</span> {data.residentialAddress}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
