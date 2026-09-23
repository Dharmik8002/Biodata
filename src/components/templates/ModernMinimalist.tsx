import React from 'react';
import { BiodataData } from '../../types/biodata';
import { getDocLabels } from './templateUtils';

export const ModernMinimalist: React.FC<{ data: BiodataData }> = ({ data }) => {
  const lbl = getDocLabels(data.language);

  return (
    <div className="relative w-full h-full bg-white text-slate-800 p-8 sm:p-10 font-sans shadow-sm border border-slate-200 box-border">
      {/* Sleek Top Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b border-slate-200 pb-6 mb-6">
        <div className="space-y-1 text-center sm:text-left">
          {data.religiousHeading && (
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              {data.religiousHeading}
            </p>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
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
              className={`w-28 h-32 object-cover border border-slate-200 shadow-sm ${
                data.photoStyle === 'circle' ? 'rounded-full' : 'rounded-lg'
              }`}
            />
          </div>
        )}
      </div>

      {/* Main Grid Content */}
      <div className="space-y-5 text-xs">
        {/* Personal Details */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
            {lbl.personalDetails}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
            {data.dateOfBirth && (
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.dateOfBirth}</span>
                <span className="font-medium text-slate-800">{data.dateOfBirth} {data.age > 0 ? `(${data.age} yrs)` : ''}</span>
              </div>
            )}
            {data.heightFeet && (
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.height}</span>
                <span className="font-medium text-slate-800">{data.heightFeet}</span>
              </div>
            )}
            {data.maritalStatus && (
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.maritalStatus}</span>
                <span className="font-medium text-slate-800 capitalize">{data.maritalStatus.replace('_', ' ')}</span>
              </div>
            )}
            {data.religion && (
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.religion}</span>
                <span className="font-medium text-slate-800">{data.religion} {data.caste ? `(${data.caste})` : ''}</span>
              </div>
            )}
            {data.motherTongue && (
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.motherTongue}</span>
                <span className="font-medium text-slate-800">{data.motherTongue}</span>
              </div>
            )}
            {data.diet && (
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.diet}</span>
                <span className="font-medium text-slate-800 capitalize">{data.diet.replace('_', ' ')}</span>
              </div>
            )}
            {data.currentCity && (
              <div className="col-span-2">
                <span className="text-slate-400 block text-[11px]">{lbl.currentLocation}</span>
                <span className="font-medium text-slate-800">{[data.currentCity, data.currentState, data.currentCountry].filter(Boolean).join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education & Career */}
        {(data.highestQualification || data.occupation) && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
              {lbl.educationCareer}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {data.highestQualification && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.highestQualification}</span>
                  <span className="font-medium text-slate-800">{data.highestQualification}</span>
                </div>
              )}
              {data.degree && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.degree}</span>
                  <span className="font-medium text-slate-800">{data.degree}</span>
                </div>
              )}
              {data.collegeUniversity && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.college}</span>
                  <span className="font-medium text-slate-800">{data.collegeUniversity}</span>
                </div>
              )}
              {data.occupation && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.occupation}</span>
                  <span className="font-medium text-slate-800">{data.occupation}</span>
                </div>
              )}
              {data.jobTitle && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.jobTitle}</span>
                  <span className="font-medium text-slate-800">{data.jobTitle}</span>
                </div>
              )}
              {!data.hideEmployer && data.companyName && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.company}</span>
                  <span className="font-medium text-slate-800">{data.companyName}</span>
                </div>
              )}
              {!data.hideIncome && data.annualIncome && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.annualIncome}</span>
                  <span className="font-medium text-slate-800">{data.annualIncome}</span>
                </div>
              )}
              {data.workLocation && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.workLocation}</span>
                  <span className="font-medium text-slate-800">{data.workLocation}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName) && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
              {lbl.familyDetails}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {data.fatherName && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.fatherName}</span>
                  <span className="font-medium text-slate-800">{data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</span>
                </div>
              )}
              {data.motherName && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.motherName}</span>
                  <span className="font-medium text-slate-800">{data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</span>
                </div>
              )}
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.brothers}</span>
                <span className="font-medium text-slate-800">{data.brothersCount} {data.brothersDetails ? `— ${data.brothersDetails}` : ''}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.sisters}</span>
                <span className="font-medium text-slate-800">{data.sistersCount} {data.sistersDetails ? `— ${data.sistersDetails}` : ''}</span>
              </div>
              {data.familyType && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.familyType}</span>
                  <span className="font-medium text-slate-800 capitalize">{data.familyType}</span>
                </div>
              )}
              {data.familyResidence && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.familyResidence}</span>
                  <span className="font-medium text-slate-800">{data.familyResidence}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Horoscope (Optional) */}
        {data.includeHoroscope && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
              {lbl.horoscopeDetails}
            </h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              {data.timeOfBirth && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.timeOfBirth}</span>
                  <span className="font-medium text-slate-800">{data.timeOfBirth}</span>
                </div>
              )}
              {data.rashi && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.rashi}</span>
                  <span className="font-medium text-slate-800">{data.rashi}</span>
                </div>
              )}
              {data.gotra && (
                <div>
                  <span className="text-slate-400 block text-[11px]">{lbl.gotra}</span>
                  <span className="font-medium text-slate-800">{data.gotra}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* About Me */}
        {data.aboutMe && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
              {lbl.aboutMe}
            </h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{data.aboutMe}</p>
          </div>
        )}

        {/* Contact Details */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
            {lbl.contactDetails}
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {data.contactPersonName && (
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.contactPerson}</span>
                <span className="font-medium text-slate-800">{data.contactPersonName} {data.relationship ? `(${data.relationship})` : ''}</span>
              </div>
            )}
            {data.showPhone && data.primaryPhone && (
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.phone}</span>
                <span className="font-medium text-slate-800">{data.primaryPhone}</span>
              </div>
            )}
            {data.showEmail && data.email && (
              <div>
                <span className="text-slate-400 block text-[11px]">{lbl.email}</span>
                <span className="font-medium text-slate-800">{data.email}</span>
              </div>
            )}
            {data.showAddress && data.residentialAddress && (
              <div className="col-span-2">
                <span className="text-slate-400 block text-[11px]">{lbl.address}</span>
                <span className="font-medium text-slate-800">{data.residentialAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
