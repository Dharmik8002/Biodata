import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels, OmIcon } from './templateUtils';

export const ClassicTraditional: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div className="relative w-full h-full bg-[#FAF6F0] text-amber-950 p-8 sm:p-10 font-marcellus shadow-sm border-[4px] border-[#8B1E0F] box-border">
      {/* Auspicious header */}
      <div className="border-b-2 border-[#8B1E0F] pb-4 mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-1">
          <OmIcon className="w-8 h-8" color="#8B1E0F" />
        </div>
        {data.religiousHeading && (
          <p className="text-xs font-semibold text-[#8B1E0F] tracking-widest uppercase mb-1">
            {data.religiousHeading}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wider text-[#8B1E0F] uppercase font-cinzel">
          {data.title || lbl.marriageBiodata}
        </h1>
      </div>

      {/* Top Banner with Photo & Core Summary */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 pb-6 border-b border-[#8B1E0F]/30">
        {data.photoUrl && (
          <div className="shrink-0 p-1 border-2 border-[#C59B27] bg-white rounded-lg shadow-sm">
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
          <h2 className="text-2xl font-bold text-[#8B1E0F] font-playfair">{data.fullName}</h2>
          {data.profileHeadline && (
            <p className="text-xs italic text-amber-900/80">"{data.profileHeadline}"</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-2">
            {data.dateOfBirth && (
              <div>
                <span className="font-bold text-[#8B1E0F]">{lbl.dateOfBirth}:</span> {data.dateOfBirth} {data.age > 0 ? `(${data.age} ${lbl.years})` : ''}
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="font-bold text-[#8B1E0F]">{lbl.height}:</span> {data.heightFeet}
              </div>
            )}
            {data.religion && (
              <div>
                <span className="font-bold text-[#8B1E0F]">{lbl.religion}:</span> {data.religion} {data.caste ? `(${data.caste})` : ''}
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="font-bold text-[#8B1E0F]">{lbl.motherTongue}:</span> {data.motherTongue}
              </div>
            )}
            {data.currentCity && (
              <div className="col-span-2">
                <span className="font-bold text-[#8B1E0F]">{lbl.currentLocation}:</span> {[data.currentCity, data.currentState].filter(Boolean).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-5 text-xs">
        {/* Education & Career */}
        {(data.highestQualification || data.occupation) && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B1E0F] border-b border-[#C59B27] pb-1 mb-2 font-cinzel">
              {lbl.educationCareer}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {data.highestQualification && (
                <div><span className="font-semibold">{lbl.highestQualification}:</span> {data.highestQualification}</div>
              )}
              {data.degree && (
                <div><span className="font-semibold">{lbl.degree}:</span> {data.degree}</div>
              )}
              {data.collegeUniversity && (
                <div><span className="font-semibold">{lbl.college}:</span> {data.collegeUniversity}</div>
              )}
              {data.occupation && (
                <div><span className="font-semibold">{lbl.occupation}:</span> {data.occupation}</div>
              )}
              {data.jobTitle && (
                <div><span className="font-semibold">{lbl.jobTitle}:</span> {data.jobTitle}</div>
              )}
              {!data.hideEmployer && data.companyName && (
                <div><span className="font-semibold">{lbl.company}:</span> {data.companyName}</div>
              )}
              {!data.hideIncome && data.annualIncome && (
                <div><span className="font-semibold">{lbl.annualIncome}:</span> {data.annualIncome}</div>
              )}
              {data.workLocation && (
                <div><span className="font-semibold">{lbl.workLocation}:</span> {data.workLocation}</div>
              )}
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName) && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B1E0F] border-b border-[#C59B27] pb-1 mb-2 font-cinzel">
              {lbl.familyDetails}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {data.fatherName && (
                <div><span className="font-semibold">{lbl.fatherName}:</span> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>
              )}
              {data.motherName && (
                <div><span className="font-semibold">{lbl.motherName}:</span> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>
              )}
              <div>
                <span className="font-semibold">{lbl.brothers}:</span> {data.brothersCount} {data.brothersDetails ? `(${data.brothersDetails})` : ''}
              </div>
              <div>
                <span className="font-semibold">{lbl.sisters}:</span> {data.sistersCount} {data.sistersDetails ? `(${data.sistersDetails})` : ''}
              </div>
              {data.familyType && (
                <div><span className="font-semibold">{lbl.familyType}:</span> {data.familyType}</div>
              )}
              {data.familyNativePlace && (
                <div><span className="font-semibold">{lbl.familyNative}:</span> {data.familyNativePlace}</div>
              )}
            </div>

            {data.additionalFamilyMembers?.length > 0 && (
              <div className="mt-2 border-t border-amber-200/60 pt-1.5 space-y-1">
                {data.additionalFamilyMembers.map((m) => (
                  <div key={m.id}>
                    <span className="font-semibold">{m.relation}:</span> {m.name} {m.details ? `(${m.details})` : ''}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Horoscope */}
        {data.includeHoroscope && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B1E0F] border-b border-[#C59B27] pb-1 mb-2 font-cinzel">
              {lbl.horoscopeDetails}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
              {data.timeOfBirth && <div><span className="font-semibold">{lbl.timeOfBirth}:</span> {data.timeOfBirth}</div>}
              {data.placeOfBirth && <div><span className="font-semibold">{lbl.placeOfBirth}:</span> {data.placeOfBirth}</div>}
              {data.rashi && <div><span className="font-semibold">{lbl.rashi}:</span> {data.rashi}</div>}
              {data.nakshatra && <div><span className="font-semibold">{lbl.nakshatra}:</span> {data.nakshatra}</div>}
              {data.gotra && <div><span className="font-semibold">{lbl.gotra}:</span> {data.gotra}</div>}
              {data.manglikStatus && <div><span className="font-semibold">{lbl.manglik}:</span> {data.manglikStatus}</div>}
            </div>
          </div>
        )}

        {/* About Me */}
        {data.aboutMe && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B1E0F] border-b border-[#C59B27] pb-1 mb-2 font-cinzel">
              {lbl.aboutMe}
            </h3>
            <p className="leading-relaxed whitespace-pre-line">{data.aboutMe}</p>
          </div>
        )}

        {/* Partner Preferences */}
        {data.includePartnerPreferences && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B1E0F] border-b border-[#C59B27] pb-1 mb-2 font-cinzel">
              {lbl.partnerPreferences}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {(data.partnerAgeMin || data.partnerAgeMax) && (
                <div><span className="font-semibold">{lbl.prefAge}:</span> {data.partnerAgeMin} - {data.partnerAgeMax} {lbl.years}</div>
              )}
              {data.partnerHeightRange && (
                <div><span className="font-semibold">{lbl.prefHeight}:</span> {data.partnerHeightRange}</div>
              )}
              {data.partnerEducation && (
                <div><span className="font-semibold">{lbl.prefEducation}:</span> {data.partnerEducation}</div>
              )}
              {data.partnerLocation && (
                <div><span className="font-semibold">{lbl.prefLocation}:</span> {data.partnerLocation}</div>
              )}
            </div>
          </div>
        )}

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B1E0F] border-b border-[#C59B27] pb-1 mb-2 font-cinzel">
            {lbl.contactDetails}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {data.contactPersonName && (
              <div><span className="font-semibold">{lbl.contactPerson}:</span> {data.contactPersonName} {data.relationship ? `(${data.relationship})` : ''}</div>
            )}
            {data.showPhone && data.primaryPhone && (
              <div><span className="font-semibold">{lbl.phone}:</span> {data.primaryPhone}</div>
            )}
            {data.showEmail && data.email && (
              <div><span className="font-semibold">{lbl.email}:</span> {data.email}</div>
            )}
            {data.showAddress && data.residentialAddress && (
              <div className="col-span-2"><span className="font-semibold">{lbl.address}:</span> {data.residentialAddress}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
