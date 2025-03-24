
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ModulePermission } from "@/types/roles";

interface ModuleCheckboxProps {
  moduleId: string;
  moduleName: string;
  selectedPermissions: ModulePermission[];
  onChange: (moduleId: string, permission: ModulePermission, checked: boolean) => void;
}

export const ModuleCheckbox: React.FC<ModuleCheckboxProps> = ({
  moduleId,
  moduleName,
  selectedPermissions,
  onChange
}) => {
  const permissions: ModulePermission[] = ['view', 'create', 'edit', 'delete', 'approve'];

  return (
    <div className="space-y-2 bg-gray-50 p-3 rounded-md">
      <Label className="font-medium text-gray-700">{moduleName}</Label>
      <div className="flex flex-wrap gap-4 mt-2">
        {permissions.map((permission) => (
          <div key={`${moduleId}-${permission}`} className="flex items-center space-x-2">
            <Checkbox 
              id={`${moduleId}-${permission}`}
              checked={selectedPermissions.includes(permission)}
              onCheckedChange={(checked) => {
                onChange(moduleId, permission, checked === true);
              }}
            />
            <Label 
              htmlFor={`${moduleId}-${permission}`}
              className="text-sm font-normal capitalize"
            >
              {permission}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
