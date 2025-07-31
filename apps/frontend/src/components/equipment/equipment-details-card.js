'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, } from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { ChevronDown, ChevronUp, Package, Info } from 'lucide-react';
export function EquipmentDetailsCard({ solarDesign, projectEquipment = [] }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // Group equipment by category
    const equipmentByCategory = projectEquipment.reduce((acc, item) => {
        const category = item.equipment.category.name;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});
    // Calculate totals
    const totalEquipmentCost = projectEquipment.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalSavings = projectEquipment.reduce((sum, item) => {
        const standardTotal = item.equipment.standardPrice * item.quantity;
        return sum + (standardTotal - item.totalPrice);
    }, 0);
    const parseSpecifications = (specs) => {
        if (!specs)
            return null;
        try {
            return JSON.parse(specs);
        }
        catch {
            return null;
        }
    };
    return (<Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Solar System Design</CardTitle>
            <CardDescription>
              {solarDesign.systemSize} kW system with {solarDesign.panelCount} panels
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="ml-auto">
            {isExpanded ? (<>
                <ChevronUp className="h-4 w-4 mr-1"/>
                Hide Details
              </>) : (<>
                <ChevronDown className="h-4 w-4 mr-1"/>
                Show Details
              </>)}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">System Size</p>
              <p className="text-lg font-semibold">{solarDesign.systemSize} kW</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Panel Count</p>
              <p className="text-lg font-semibold">{solarDesign.panelCount}</p>
            </div>
            {solarDesign.annualProduction && (<div>
                <p className="text-sm text-muted-foreground">Annual Production</p>
                <p className="text-lg font-semibold">
                  {solarDesign.annualProduction.toLocaleString()} kWh
                </p>
              </div>)}
            {projectEquipment.length > 0 && (<div>
                <p className="text-sm text-muted-foreground">Equipment Cost</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">
                    ${totalEquipmentCost.toLocaleString()}
                  </p>
                  {totalSavings > 0 && (<Badge variant="secondary" className="text-green-600">
                      Save ${totalSavings.toLocaleString()}
                    </Badge>)}
                </div>
              </div>)}
          </div>

          {/* Expandable Equipment Details */}
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleContent className="space-y-4">
              {Object.entries(equipmentByCategory).map(([category, items]) => (<div key={category} className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Package className="h-4 w-4"/>
                    {category}
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Equipment</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (<TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.equipment.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.equipment.manufacturer} - {item.equipment.modelNumber}
                              </p>
                              {item.vendorUsed && (<Badge variant="outline" className="mt-1">
                                  {item.vendorUsed}
                                </Badge>)}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            <div>
                              <p className="font-medium">${item.unitPrice.toLocaleString()}</p>
                              {item.unitPrice < item.equipment.standardPrice && (<p className="text-sm text-muted-foreground line-through">
                                  ${item.equipment.standardPrice.toLocaleString()}
                                </p>)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${item.totalPrice.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedItem(item)}>
                              <Info className="h-4 w-4"/>
                            </Button>
                          </TableCell>
                        </TableRow>))}
                    </TableBody>
                  </Table>
                </div>))}

              {/* Equipment Summary */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Equipment Cost</p>
                    {totalSavings > 0 && (<p className="text-sm text-green-600">
                        Vendor savings: ${totalSavings.toLocaleString()}
                      </p>)}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${totalEquipmentCost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>

      {/* Equipment Detail Modal/Sheet would go here */}
      {selectedItem && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>{selectedItem.equipment.name}</CardTitle>
              <CardDescription>
                {selectedItem.equipment.manufacturer} - {selectedItem.equipment.modelNumber}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedItem.equipment.description && (<div>
                  <h4 className="font-medium mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.equipment.description}
                  </p>
                </div>)}
              
              {selectedItem.equipment.specifications && (<div>
                  <h4 className="font-medium mb-1">Specifications</h4>
                  <pre className="text-sm bg-muted p-3 rounded-md overflow-auto">
                    {JSON.stringify(parseSpecifications(selectedItem.equipment.specifications), null, 2)}
                  </pre>
                </div>)}

              {selectedItem.notes && (<div>
                  <h4 className="font-medium mb-1">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedItem.notes}</p>
                </div>)}

              <div className="flex justify-end">
                <Button onClick={() => setSelectedItem(null)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>)}
    </Card>);
}
