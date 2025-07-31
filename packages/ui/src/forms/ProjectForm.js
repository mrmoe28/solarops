import React from 'react';
import { ProjectStatus } from '@solarops/shared';
import { Calendar, MapPin, Battery, FileText } from 'lucide-react';
export function ProjectForm({ project }) {
    const getStatusColor = (status) => {
        switch (status) {
            case ProjectStatus.COMPLETED:
                return 'bg-green-100 text-green-800';
            case ProjectStatus.IN_PROGRESS:
                return 'bg-blue-100 text-blue-800';
            case ProjectStatus.FAILED:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    return (<div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2"/>
            {project.address}, {project.city}, {project.state} {project.zipCode}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2"/>
            Created {formatDate(project.createdAt)}
          </div>
        </div>

        {project.status === ProjectStatus.COMPLETED && (<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.solarDesign && (<div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Battery className="h-8 w-8 text-blue-600"/>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">System Size</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {project.solarDesign.systemSize} kW
                    </p>
                  </div>
                </div>
              </div>)}

            {project.proposal && (<div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-green-600"/>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Estimated Savings</p>
                    <p className="text-lg font-semibold text-green-600">
                      ${project.proposal.savings?.annual}/year
                    </p>
                  </div>
                </div>
              </div>)}
          </div>)}
      </div>
    </div>);
}
