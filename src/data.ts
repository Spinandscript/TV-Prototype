import { EquipmentNode } from './types';

export const EQUIPMENT_NODES: EquipmentNode[] = [
  {
    id: 'entrance',
    name: 'Entrance',
    status: 'Healthy',
    model: 'ENT-3000 Auto-Sentry',
    specs: [
      { label: 'Asset Type', value: 'Vehicle Positioner & Gate' },
      { label: 'Photoeye Sensor', value: 'Banner Engineering QS30' },
      { label: 'Controller Type', value: 'PLC Digital Controller v4.2' },
      { label: 'Loop Detector', value: 'Dual Channel Inductive' }
    ],
    installDate: 'Oct 12, 2024',
    installedBy: 'Pro-Wash Installations',
    vendor: 'Sunny Sentry',
    distributor: 'Wash Equipment Co.',
    warranty: 'Expired (Oct 2025)',
    compatibleParts: [
      {
        id: 'pe-sensor',
        name: 'Retroreflective Photoeye Sensor',
        category: 'Sensors',
        qty: 1,
        price: '$189.00',
        thumbnail: 'pe_sensor',
        compatibilityCode: 'ENT-PE-99',
        vendor: 'Banner'
      },
      {
        id: 'gate-arm',
        name: '12ft Illuminated Gate Arm',
        category: 'Hardware',
        qty: 1,
        price: '$245.00',
        thumbnail: 'gate_arm',
        compatibilityCode: 'ENT-ARM-12',
        vendor: 'Sunny Sentry'
      }
    ],
    serviceHistory: [
      { date: 'Dec 05, 2025', action: 'Sensor Calibration', technician: 'Marcus L.', notes: 'Realigned photocell emitter to resolve intermittent vehicle detection delays.' }
    ],
    relatedAssets: ['Conveyor'],
    documents: [
      { name: 'ENT-3000_Installation_Guide.pdf', type: 'PDF', size: '4.2 MB' },
      { name: 'Sensor_Wiring_Schematic_v2.dwg', type: 'CAD', size: '12.8 MB' }
    ],
    alertMessage: 'Photoeye aligned. Optical lens is clean and reporting 98% signal strength. No immediate action required.'
  },
  {
    id: 'prep-arch',
    name: 'Prep Arch',
    status: 'Healthy',
    model: 'Parch-Ultra-18',
    specs: [
      { label: 'Nozzle Assembly', value: '18 Dual-Port High-Velocity' },
      { label: 'Pump Station', value: 'Cat Pumps 3535 (35 GPM)' },
      { label: 'Operating Pressure', value: '1,000 PSI' },
      { label: 'Drive Motor', value: 'TEFC 15 HP Premium Efficiency' }
    ],
    installDate: 'Jun 20, 2024',
    installedBy: 'WashTech Systems',
    vendor: 'Sonny\'s Enterprises',
    distributor: 'Wash Equipment Co.',
    warranty: 'Active (Expires Jun 2026)',
    compatibleParts: [
      {
        id: 'nozzle-tip',
        name: '0.05" Meg Nozzle Tip (15°)',
        category: 'Nozzles',
        qty: 18,
        price: '$12.50',
        thumbnail: 'nozzle_tip',
        compatibilityCode: 'NZ-MEG-15',
        vendor: 'Sonny\'s'
      },
      {
        id: 'pump-seal',
        name: 'Cat Pump 3535 Seal Kit',
        category: 'Pumps',
        qty: 1,
        price: '$135.00',
        thumbnail: 'pump_seal',
        compatibilityCode: 'CAT-3535-SK',
        vendor: 'Cat Pumps'
      }
    ],
    serviceHistory: [
      { date: 'Jan 18, 2026', action: 'High Pressure Seal Swapped', technician: 'Sarah T.', notes: 'Replaced weeping water seals on pump station. Restored optimal 1,000 PSI.' }
    ],
    relatedAssets: ['Hydraulic'],
    documents: [
      { name: 'Parch-Ultra_Operations_Manual.pdf', type: 'PDF', size: '8.4 MB' }
    ],
    alertMessage: 'Prep Arch pressure is stable at 985 PSI. No nozzle blockages detected via flow-rate telemetry.'
  },
  {
    id: 'conveyor',
    name: 'Conveyor',
    status: 'Attention',
    model: 'CV-120 Over-and-Under',
    specs: [
      { label: 'Deck Length', value: '120 ft' },
      { label: 'Chain Type', value: 'X458 Log-Chain Design' },
      { label: 'Drive System', value: 'Direct Hydraulic-Gear Drive' },
      { label: 'Guide Rails', value: 'UHMW Polymer Protective Sleeves' }
    ],
    installDate: 'Mar 15, 2025',
    installedBy: 'ABC Express Wash',
    vendor: 'Sonny\'s Enterprises',
    distributor: 'Wash Equipment Co.',
    warranty: 'Active (Expires Mar 2027)',
    compatibleParts: [
      {
        id: 'conveyor-chain',
        name: '120\' Sonny\'s Conveyor Chain',
        category: 'Conveyors',
        qty: 1,
        price: '$1,850.00',
        thumbnail: 'conveyor_chain',
        compatibilityCode: 'CV-CHN-120',
        vendor: 'Sonny\'s'
      },
      {
        id: 'rollers',
        name: '480 Conveyor Rollers (4" Dual)',
        category: 'Conveyors',
        qty: 480,
        price: '$3,400.00',
        thumbnail: 'rollers',
        compatibilityCode: 'CV-RLR-4',
        vendor: 'Wash Equipment Co.'
      },
      {
        id: 'master-links',
        name: '2 Conveyor Master Links (X458)',
        category: 'Conveyors',
        qty: 2,
        price: '$45.00',
        thumbnail: 'master_links',
        compatibilityCode: 'CV-LNK-458',
        vendor: 'Sonny\'s'
      }
    ],
    serviceHistory: [
      { date: 'Nov 12, 2025', action: 'Chain Tension Check', technician: 'Marcus L.', notes: 'Adjusted conveyor hydraulic tension cylinder pressure to 750 PSI. No slack detected.' }
    ],
    relatedAssets: ['Entrance', 'Hydraulic'],
    documents: [
      { name: 'CV-120_Conveyor_Assembly.pdf', type: 'PDF', size: '14.5 MB' },
      { name: 'Lubrication_Schedule_2026.xlsx', type: 'Excel', size: '1.1 MB' }
    ],
    alertMessage: 'It looks like you\'re replacing the conveyor chain. Based on the current installation, I recommend installing the full chain overhaul kit including high-durability rollers and Master Links.'
  },
  {
    id: 'top-brush',
    name: 'Top Brush',
    status: 'Healthy',
    model: 'TB-180 Flex-Wrap',
    specs: [
      { label: 'Brush Diameter', value: '48 inches' },
      { label: 'Filament Material', value: 'High-Density MicroClean Foam' },
      { label: 'Rotational Drive', value: 'Air-Over-Hydraulic Counterbalance' },
      { label: 'RPM Range', value: '0 - 180 RPM variable' }
    ],
    installDate: 'Feb 10, 2025',
    installedBy: 'Pro-Wash Installations',
    vendor: 'Sonny\'s Enterprises',
    distributor: 'Wash Equipment Co.',
    warranty: 'Active (Expires Feb 2027)',
    compatibleParts: [
      {
        id: 'foam-segments',
        name: 'Top Brush Foam Replacement Set',
        category: 'Brushes',
        qty: 1,
        price: '$850.00',
        thumbnail: 'foam_segments',
        compatibilityCode: 'TB-FM-48',
        vendor: 'Sonny\'s'
      },
      {
        id: 'brush-motor',
        name: 'Hydraulic Brush Motor (Reversible)',
        category: 'Motors',
        qty: 1,
        price: '$520.00',
        thumbnail: 'brush_motor',
        compatibilityCode: 'TB-MTR-180',
        vendor: 'MacNeil'
      }
    ],
    serviceHistory: [
      { date: 'May 04, 2025', action: 'Foam Segment Replacement', technician: 'Sarah T.', notes: 'Replaced center 4 rows of foam media due to heavy wash cycle erosion.' }
    ],
    relatedAssets: ['Wrap Brushes'],
    documents: [
      { name: 'TB-180_Spare_Parts_Breakdown.pdf', type: 'PDF', size: '3.6 MB' }
    ],
    alertMessage: 'Top Brush balance is calibrated. Rotational speed checks out at 145 RPM. Torque levels are nominal.'
  },
  {
    id: 'wrap-brushes',
    name: 'Wrap Brushes',
    status: 'Attention',
    model: 'WB-Dual-X Neoglide',
    specs: [
      { label: 'Brush Material', value: 'Premium Neoglide Closed-Cell Foam' },
      { label: 'Side Clearances', value: 'Pneumatic Retract Controls' },
      { label: 'Operating Amps', value: '9.2 A (Passenger) / 7.4 A (Driver)' },
      { label: 'Tilt Angle', value: '5° Inward Preset' }
    ],
    installDate: 'Sep 02, 2024',
    installedBy: 'WashTech Systems',
    vendor: 'MacNeil Wash Systems',
    distributor: 'Wash Equipment Co.',
    warranty: 'Active (Expires Sep 2026)',
    compatibleParts: [
      {
        id: 'neoglide-foam',
        name: 'Passenger Side Neoglide Foam Segments',
        category: 'Brushes',
        qty: 1,
        price: '$1,120.00',
        thumbnail: 'neoglide_foam',
        compatibilityCode: 'WB-NEO-PASS',
        vendor: 'MacNeil'
      },
      {
        id: 'shock-absorber',
        name: 'Pneumatic Swing Shock Absorber',
        category: 'Pneumatics',
        qty: 2,
        price: '$115.00',
        thumbnail: 'shock_absorber',
        compatibilityCode: 'WB-SHK-22',
        vendor: 'Bimba'
      }
    ],
    serviceHistory: [
      { date: 'Oct 14, 2025', action: 'Pneumatic Arm Tuning', technician: 'Marcus L.', notes: 'Realigned pivot bearings on passenger brush swing arm to resolve binding.' }
    ],
    relatedAssets: ['Top Brush', 'Hydraulic'],
    documents: [
      { name: 'WB-Dual-X_Maintenance_Manual.pdf', type: 'PDF', size: '6.9 MB' }
    ],
    alertMessage: 'Passenger-side wrap brush is showing increased drag (9.2 Amps vs 7.4 Amps driver baseline). I recommend replacing the passenger-side Neoglide foam segments to prevent vehicles scuffs.'
  },
  {
    id: 'dryers',
    name: 'Dryers',
    status: 'Attention',
    model: 'Max-Dry-45 Custom',
    specs: [
      { label: 'Dryer Elements', value: '4 x 15 HP Centrifugal Fans' },
      { label: 'Air Speed', value: '185 MPH Velocity' },
      { label: 'Current Vibration', value: '7.8 mm/s on Blower #3' },
      { label: 'housing Material', value: 'Molded Ultra-High Density Poly' }
    ],
    installDate: 'Jan 22, 2025',
    installedBy: 'ABC Express Wash',
    vendor: 'Coleman Hanna',
    distributor: 'Wash Equipment Co.',
    warranty: 'Active (Expires Jan 2027)',
    compatibleParts: [
      {
        id: 'dryer-impeller',
        name: '15 HP Dynamically Balanced Impeller',
        category: 'Dryers',
        qty: 1,
        price: '$450.00',
        thumbnail: 'dryer_impeller',
        compatibilityCode: 'DRY-IMP-15',
        vendor: 'Coleman Hanna'
      },
      {
        id: 'vibration-mounts',
        name: 'Dynamic-Balance Neoprene Dampeners (Set of 4)',
        category: 'Dryers',
        qty: 1,
        price: '$85.00',
        thumbnail: 'vibration_mounts',
        compatibilityCode: 'DRY-MNT-NEO',
        vendor: 'Coleman Hanna'
      }
    ],
    serviceHistory: [
      { date: 'Nov 30, 2025', action: 'Vibration Analysis', technician: 'Sarah T.', notes: 'Blower #3 casing inspected. Found minor pitting on aluminum blades causing vibration. Cleaned and tightened mounting bolts.' }
    ],
    relatedAssets: ['Exit Arch'],
    documents: [
      { name: 'Max-Dry-45_Airflow_Schematics.pdf', type: 'PDF', size: '5.8 MB' },
      { name: 'Dryer_Impeller_Torque_Specs.pdf', type: 'PDF', size: '1.2 MB' }
    ],
    alertMessage: 'Blower #3 exhibits anomalous high-frequency vibrations (7.8 mm/s). I recommend checking the impeller coupling and installing dynamic-balance neoprene dampeners immediately.'
  },
  {
    id: 'hydraulic',
    name: 'Hydraulic',
    status: 'Monitor',
    model: 'HPU-Premium 30GPM',
    specs: [
      { label: 'Flow Rate', value: '30 GPM Variable Displacement' },
      { label: 'Reservoir Capacity', value: '60 Gallons AW46' },
      { label: 'Operating Temp', value: '142°F (Warning Limit: 150°F)' },
      { label: 'Output Drive', value: 'Variable Frequency Drive (VFD)' }
    ],
    installDate: 'Aug 18, 2024',
    installedBy: 'WashTech Systems',
    vendor: 'Sonny\'s Enterprises',
    distributor: 'Wash Equipment Co.',
    warranty: 'Active (Expires Aug 2026)',
    compatibleParts: [
      {
        id: 'hydraulic-seal',
        name: 'High-Pressure Nitrile Cylinder Seal Gaskets',
        category: 'Hydraulics',
        qty: 2,
        price: '$65.00',
        thumbnail: 'hydraulic_seal',
        compatibilityCode: 'HYD-SL-AW46',
        vendor: 'Sonny\'s'
      },
      {
        id: 'oil-filter',
        name: '10 Micron Hydraulic Return Filter',
        category: 'Hydraulics',
        qty: 1,
        price: '$45.00',
        thumbnail: 'oil_filter',
        compatibilityCode: 'HYD-FLT-10',
        vendor: 'Parker'
      }
    ],
    serviceHistory: [
      { date: 'Aug 02, 2025', action: 'Oil & Filter Overhaul', technician: 'Marcus L.', notes: 'Flushed reservoir. Filled with 60 gallons AW46 fluid. Replaced main suction and return filters.' }
    ],
    relatedAssets: ['Conveyor', 'Wrap Brushes'],
    documents: [
      { name: 'HPU-30GPM_Piping_Diagram.pdf', type: 'PDF', size: '11.2 MB' }
    ],
    alertMessage: 'HPU oil temperature is trending high (142°F). I recommend cleaning heat-exchanger cooling fins and checking cylinder seals for micro-leaks.'
  },
  {
    id: 'exit-arch',
    name: 'Exit Arch',
    status: 'Healthy',
    model: 'EA-Rainmaker Ultra',
    specs: [
      { label: 'Nozzle Header', value: 'V-Jet Spot-Free Rain' },
      { label: 'Chemical Injection', value: 'Dema Injector Block' },
      { label: 'Solenoid Valves', value: 'Asco Brass 3/4" NPT' },
      { label: 'Rinse Flow Rate', value: '8 GPM @ 40 PSI' }
    ],
    installDate: 'May 11, 2025',
    installedBy: 'ABC Express Wash',
    vendor: 'Sonny\'s Enterprises',
    distributor: 'Wash Equipment Co.',
    warranty: 'Active (Expires May 2027)',
    compatibleParts: [
      {
        id: 'vjet-nozzle',
        name: 'V-Jet Brass Rinse Nozzle 1/4"',
        category: 'Nozzles',
        qty: 12,
        price: '$18.00',
        thumbnail: 'vjet_nozzle',
        compatibilityCode: 'EA-VJET-25',
        vendor: 'Sonny\'s'
      },
      {
        id: 'solenoid-rebuild',
        name: 'Asco 3/4" Solenoid Rebuild Kit',
        category: 'Valves',
        qty: 1,
        price: '$72.00',
        thumbnail: 'solenoid_rebuild',
        compatibilityCode: 'ASC-72-SLK',
        vendor: 'Asco'
      }
    ],
    serviceHistory: [
      { date: 'Nov 18, 2025', action: 'Chemical Solenoid Replacement', technician: 'Sarah T.', notes: 'Replaced sticky wax valve actuator solenoid to ensure prompt wax spray cutoff.' }
    ],
    relatedAssets: ['Dryers'],
    documents: [
      { name: 'EA-Rainmaker_Solenoid_Manual.pdf', type: 'PDF', size: '2.9 MB' }
    ],
    alertMessage: 'Exit Arch spray patterns check out. Solenoids trigger in less than 200ms. Spot-free water pressure is a nominal 42 PSI.'
  }
];
