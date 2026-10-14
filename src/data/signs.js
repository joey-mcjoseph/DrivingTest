// Sign catalogue for the Signs tab and the sign quizzes. Meanings follow the
// road-sign chapter of the Theory Book 2026. `code` is the Swedish sign code.
export const SIGN_GROUPS = [
  { id: 'warning', name: 'Warning signs', hint: 'Yellow triangles with a red border: something ahead needs extra care.' },
  { id: 'priority', name: 'Priority signs', hint: 'Who goes first: give way, stop, priority roads and crossings.' },
  { id: 'prohibitory', name: 'Prohibitory signs', hint: 'Round with a red border: something is not allowed.' },
  { id: 'mandatory', name: 'Mandatory signs', hint: 'Round and blue: you must do what the sign shows.' },
  { id: 'instruction', name: 'Instruction signs', hint: 'Mostly blue squares: information about the road ahead.' },
]

export const SIGNS = [
  // Warning (A)
  { sign: 'w-curve', code: 'A1', group: 'warning', name: 'Dangerous curve', meaning: 'Warning: dangerous bend ahead' },
  { sign: 'w-curves', code: 'A2', group: 'warning', name: 'Multiple dangerous curves', meaning: 'Warning: several dangerous bends ahead' },
  { sign: 'w-hill', code: 'A3', group: 'warning', name: 'Steep hill downwards', meaning: 'Warning: steep downhill slope ahead' },
  { sign: 'w-narrows', code: 'A5', group: 'warning', name: 'Road narrows', meaning: 'Warning: the road gets narrower ahead' },
  { sign: 'w-bump', code: 'A9', group: 'warning', name: 'Speed bump', meaning: 'Warning: speed bump ahead' },
  { sign: 'w-slippery', code: 'A10', group: 'warning', name: 'Slippery road', meaning: 'Warning: the road may be slippery' },
  { sign: 'w-pedestrian', code: 'A13', group: 'warning', name: 'Pedestrian crossing ahead', meaning: 'Warning: pedestrian crossing ahead' },
  { sign: 'w-children', code: 'A15', group: 'warning', name: 'Children', meaning: 'Warning: children may be on or near the road (e.g. a school)' },
  { sign: 'w-cyclists', code: 'A16', group: 'warning', name: 'Cyclists and mopeds', meaning: 'Warning: cyclists and moped riders often cross or use the road' },
  { sign: 'w-elk', code: 'A19', group: 'warning', name: 'Animals (elk)', meaning: 'Warning: wild animals, here elk, may cross. It covers about 800 m' },
  { sign: 'w-roadworks', code: 'A20', group: 'warning', name: 'Roadworks', meaning: 'Warning: roadworks ahead, so drive slowly' },
  { sign: 'w-signals', code: 'A22', group: 'warning', name: 'Traffic signals', meaning: 'Warning: traffic lights ahead' },
  { sign: 'w-twoway', code: 'A25', group: 'warning', name: 'Two-way traffic', meaning: 'Warning: two-way traffic ahead (e.g. at the end of a one-way road)' },
  { sign: 'w-junction', code: 'A28', group: 'warning', name: 'Junction', meaning: 'Warning: junction where the priority-to-the-right rule applies' },
  { sign: 'w-sideroad', code: 'A29', group: 'warning', name: 'Junction with give-way', meaning: 'Warning: junction where traffic from the side roads must give way or stop' },
  { sign: 'w-roundabout', code: 'A30', group: 'warning', name: 'Roundabout ahead', meaning: 'Warning: roundabout ahead' },
  { sign: 'w-gates', code: 'A35', group: 'warning', name: 'Level crossing with gates', meaning: 'Warning: railway crossing with barriers ahead' },
  { sign: 'w-train', code: 'A36', group: 'warning', name: 'Level crossing without gates', meaning: 'Warning: railway crossing without barriers ahead' },
  { sign: 'rail-distance', code: 'A38', group: 'warning', name: 'Distance to level crossing', meaning: 'Distance to a level crossing: 3 bars is furthest away, then 2, then 1' },
  { sign: 'rail-cross', code: 'A39', group: 'warning', name: 'Train crossing', meaning: 'Railway crossing: right at the tracks, give way to trains' },
  { sign: 'w-danger', code: 'A40', group: 'warning', name: 'Other danger', meaning: 'Warning: another danger, explained on a panel below' },

  // Priority (B)
  { sign: 'giveway', code: 'B1', group: 'priority', name: 'Give way', meaning: 'Give way to crossing traffic; stop only if needed' },
  { sign: 'stop', code: 'B2', group: 'priority', name: 'Stop', meaning: 'Always stop completely, then give way' },
  { sign: 'crossing', code: 'B3', group: 'priority', name: 'Pedestrian crossing', meaning: 'Pedestrian crossing: give way to pedestrians on or about to step onto it' },
  { sign: 'priority', code: 'B4', group: 'priority', name: 'Priority road', meaning: 'Priority road: traffic joining it must give way to you' },
  { sign: 'end-priority', code: 'B5', group: 'priority', name: 'Priority road ends', meaning: 'End of the priority road' },
  { sign: 'oncoming-priority', code: 'B6', group: 'priority', name: 'Priority for oncoming vehicles', meaning: 'Narrow section: give way to oncoming traffic' },
  { sign: 'priority-over-oncoming', code: 'B7', group: 'priority', name: 'Priority over oncoming vehicles', meaning: 'Narrow section: oncoming traffic must give way to you' },
  { sign: 'bike-crossing', code: 'B8', group: 'priority', name: 'Bicycle crossing', meaning: 'Bicycle crossing: give way to cyclists and class II mopeds on or about to use it' },

  // Prohibitory (C)
  { sign: 'no-entry', code: 'C1', group: 'prohibitory', name: 'No entry', meaning: 'No entry for vehicles (e.g. the wrong end of a one-way street)' },
  { sign: 'no-vehicles', code: 'C2', group: 'prohibitory', name: 'No vehicles', meaning: 'Closed to all vehicles in both directions' },
  { sign: 'no-pedestrians', code: 'C15', group: 'prohibitory', name: 'No pedestrians', meaning: 'Pedestrians are not allowed' },
  { sign: 'height-limit', code: 'C17', group: 'prohibitory', name: 'Height limit', meaning: 'No vehicles taller than the height shown (3.3 m)' },
  { sign: 'weight-limit', code: 'C21', group: 'prohibitory', name: 'Weight limit', meaning: 'No vehicles or combinations with a gross weight over the stated limit (3.5 t)' },
  { sign: 'no-left', code: 'C25', group: 'prohibitory', name: 'No left turn', meaning: 'No left turn at the next junction' },
  { sign: 'no-uturn', code: 'C26', group: 'prohibitory', name: 'No U-turn', meaning: 'No turning around (U-turn)' },
  { sign: 'no-overtaking', code: 'C27', group: 'prohibitory', name: 'No overtaking', meaning: 'No overtaking of motor vehicles with more than two wheels' },
  { sign: 'speed-50', code: 'C31', group: 'prohibitory', name: 'Speed limit', meaning: 'Maximum speed 50 km/h' },
  { sign: 'no-parking', code: 'C35', group: 'prohibitory', name: 'No parking', meaning: 'No parking; stopping to load or drop off passengers is allowed' },
  { sign: 'no-parking-odd', code: 'C36', group: 'prohibitory', name: 'No parking on odd dates', meaning: 'No parking on odd-numbered dates' },
  { sign: 'no-parking-even', code: 'C37', group: 'prohibitory', name: 'No parking on even dates', meaning: 'No parking on even-numbered dates' },
  { sign: 'no-stopping', code: 'C39', group: 'prohibitory', name: 'No stopping or parking', meaning: 'No stopping or parking at all' },

  // Mandatory (D)
  { sign: 'ahead', code: 'D1', group: 'mandatory', name: 'Direction to follow: ahead', meaning: 'You must drive straight ahead' },
  { sign: 'turn-right', code: 'D1', group: 'mandatory', name: 'Direction to follow: right', meaning: 'You must turn right' },
  { sign: 'keep-right', code: 'D2', group: 'mandatory', name: 'Keep right', meaning: 'Pass the obstacle on the right' },
  { sign: 'roundabout', code: 'D3', group: 'mandatory', name: 'Roundabout', meaning: 'Roundabout: give way to traffic in it and drive anticlockwise' },
  { sign: 'bike-path', code: 'D4', group: 'mandatory', name: 'Bicycle path', meaning: 'Bicycle path for cyclists and class II mopeds; cars may only cross it' },
  { sign: 'footpath', code: 'D5', group: 'mandatory', name: 'Footpath', meaning: 'Footpath for pedestrians only' },
  { sign: 'shared-path', code: 'D7', group: 'mandatory', name: 'Separate paths for pedestrians and cyclists', meaning: 'Divided path: pedestrians on one side, cyclists on the other' },

  // Instruction (E)
  { sign: 'pedestrian-street', code: 'E7', group: 'instruction', name: 'Pedestrian street', meaning: 'Pedestrian street: only essential traffic, at walking speed' },
  { sign: 'home-zone', code: 'E9', group: 'instruction', name: 'Home zone', meaning: 'Home zone (gångfartsområde): walking speed, give way to pedestrians, park only in marked spaces' },
  { sign: 'recommended-speed', code: 'E11', group: 'instruction', name: 'Recommended lower speed', meaning: 'Recommended (not compulsory) lower speed, e.g. at a speed bump' },
  { sign: 'one-way', code: 'E16', group: 'instruction', name: 'One-way traffic', meaning: 'One-way road: all traffic goes in the direction of the arrow' },
  { sign: 'dead-end', code: 'E17', group: 'instruction', name: 'No through road', meaning: 'Dead end: no through road' },
  { sign: 'passing-place', code: 'E18', group: 'instruction', name: 'Passing place', meaning: 'Passing place (mötesplats) on a narrow road; parking not allowed' },
  { sign: 'parking', code: 'E19', group: 'instruction', name: 'Parking', meaning: 'Parking allowed: max 24 hours on weekdays unless a panel says otherwise' },
  { sign: 'parking-zone', code: 'E20', group: 'instruction', name: 'No parking zone', meaning: 'No parking anywhere in the zone except where parking signs allow it' },
  { sign: 'bike-street', code: 'E33', group: 'instruction', name: 'Bicycle street', meaning: 'Bicycle street: adapt to cyclists, max 30 km/h, park only in marked spaces' },
]

// Parking scenarios with additional panels. Panel segments: "8–18" black
// (Mon–Fri), "(8–14)" Saturdays/day before a holiday, "!10–14" red (Sundays and
// public holidays), "#disc" / "#disabled" symbols.
export const PARKING_QUESTIONS = [
  { id: 'pz1', sign: 'parking', q: 'This sign has no extra panel. How long may you park here on a weekday?', a: 'Up to 24 hours', w: ['Up to 2 hours', 'Unlimited time', 'Only to load and unload'], why: 'A single blue P sign means max 24 hours on weekdays. There is no limit on Sundays and public holidays.' },
  { id: 'pz2', sign: 'parking', q: 'This sign has no extra panel. How long may you park here on a Sunday?', a: 'There is no time limit', w: ['Up to 24 hours', 'Up to 2 hours', 'Parking is not allowed on Sundays'], why: 'The 24-hour limit only applies on weekdays.' },
  { id: 'pz3', sign: 'parking', panels: [['2 tim']], q: 'What does this sign mean?', a: 'You may park for at most 2 hours', w: ['Parking costs 2 kronor per hour', 'Parking starts in 2 hours', 'You must leave by 2 o’clock'], why: '"tim" = timmar (hours). The panel limits how long you may park.' },
  { id: 'pz4', sign: 'parking', panels: [['10 min']], q: 'What does this sign mean?', a: 'You may park for at most 10 minutes', w: ['Parking is free for 10 minutes, then you pay', 'You may stop for 10 minutes but not park', 'The car park is 10 minutes away'], why: 'Short time limits are common outside shops.' },
  { id: 'pz5', sign: 'parking', panels: [['Avgift'], ['8–18']], q: 'When must you pay to park here?', a: 'Monday–Friday 8–18', w: ['Every day 8–18', 'At all times', 'Never, it shows opening hours'], why: '"Avgift" = fee. Times in plain black apply on weekdays other than Saturdays and days before public holidays.' },
  { id: 'pz6', sign: 'parking', panels: [['Avgift'], ['8–18', '(8–14)']], q: 'It is Saturday at 15.00. Do you need to pay to park here?', a: 'No, on Saturdays you only pay 8–14', w: ['Yes, you pay 8–18 every day', 'Yes, Saturdays are always paid', 'Parking is not allowed on Saturdays'], why: 'Times in brackets apply on Saturdays (strictly, the day before a Sunday or public holiday).' },
  { id: 'pz7', sign: 'parking', panels: [['Avgift'], ['8–18', '(8–14)', '!10–14']], q: 'What do the red times mean on this panel?', a: 'They apply on Sundays and public holidays', w: ['They apply on Saturdays', 'They are the most expensive hours', 'Parking is forbidden at those times'], why: 'Black = weekdays, (brackets) = Saturdays/days before holidays, red = Sundays and public holidays.' },
  { id: 'pz8', sign: 'parking', panels: [['Avgift'], ['8–18', '(8–14)', '!10–14']], q: 'It is Sunday at 12.00. Do you pay?', a: 'Yes, the red times (10–14) apply on Sundays', w: ['No, Sundays are always free', 'Only if you stay more than 24 hours', 'No, only the bracketed times apply on Sundays'], why: 'Red times are for Sundays and public holidays.' },
  { id: 'pz9', sign: 'parking', panels: [['#disabled']], q: 'Who may park here?', a: 'Only vehicles with a disabled parking permit', w: ['Anyone, for up to 10 minutes', 'Only electric cars', 'Only motorcycles'], why: 'Without a permit you may only stop briefly to drop off or pick up passengers.' },
  { id: 'pz10', sign: 'parking', panels: [['#disc', '2 tim']], q: 'What does this sign combination mean?', a: 'Park for at most 2 hours, with a parking disc set to your arrival time', w: ['Pay at the machine for 2 hours', 'Parking only for 2-wheeled vehicles', 'Parking disc only needed after 2 hours'], why: 'Set the disc to the next half hour after you arrive.' },
  { id: 'pz11', sign: 'parking', panels: [['#disc', '2 tim']], q: 'You arrive and park here at 14.40. What do you set the parking disc to?', a: '15.00', w: ['14.30', '14.40', '16.40'], why: 'Always round up to the next half hour.' },
  { id: 'pz12', sign: 'no-parking', panels: [['8–17']], q: 'What does this sign mean?', a: 'No parking Monday–Friday 8–17', w: ['No parking every day 8–17', 'Parking only allowed 8–17', 'No stopping at all 8–17'], why: 'Plain black times apply on weekdays other than Saturdays and days before public holidays.' },
  { id: 'pz13', sign: 'no-parking', panels: [['(8–14)']], q: 'When does this parking ban apply?', a: 'On Saturdays (days before a Sunday or public holiday) 8–14', w: ['Monday–Friday 8–14', 'Every day 8–14', 'Sundays 8–14'], why: 'Times in brackets mean Saturdays.' },
  { id: 'pz14', sign: 'no-parking', q: 'May you stop under this sign to let a passenger out?', a: 'Yes, stopping to drop off or pick up passengers is allowed', w: ['No, never', 'Only for 1 minute with hazard lights', 'Only taxis'], why: 'No parking still allows stopping for passengers and loading.' },
  { id: 'pz15', sign: 'no-stopping', q: 'May you stop under this sign to let a passenger out?', a: 'No, stopping is not allowed', w: ['Yes, briefly', 'Yes, with hazard lights on', 'Yes, outside rush hour'], why: 'No stopping or parking (C39) forbids even short stops.' },
  { id: 'pz16', sign: 'no-parking-odd', q: 'It is the 15th of the month. May you park on this side of the street?', a: 'No, the 15th is an odd date', w: ['Yes', 'Only after 18.00', 'Only on the left side'], why: 'One bar = no parking on odd dates. Two bars = even dates.' },
  { id: 'pz17', sign: 'no-parking-even', q: 'It is the 8th of the month. May you park here?', a: 'No, parking is banned on even dates', w: ['Yes', 'Only for 8 hours', 'Only before 8.00'], why: 'Two bars = no parking on even dates. Date parking helps snowploughs and street cleaning.' },
  { id: 'pz18', sign: 'parking-zone', q: 'You drive past this sign. What applies inside the zone?', a: 'No parking anywhere, except in spaces marked with parking signs', w: ['Parking allowed everywhere for 24 hours', 'No entry for cars', 'Speed limit 30 km/h'], why: 'Zone sign (E20). The zone ends at the matching "zone ends" sign.' },
  { id: 'pz19', sign: 'parking', panels: [['24 tim']], q: 'You park here at 09.00 on Monday. When must you have moved at the latest?', a: '09.00 on Tuesday', w: ['18.00 on Monday', 'Never', '09.00 on Wednesday'], why: 'The panel limits parking to 24 hours.' },
  { id: 'pz20', sign: 'passing-place', q: 'May you park at this sign?', a: 'No, a passing place must be kept free', w: ['Yes, for up to 24 hours', 'Yes, at night', 'Yes, if you leave the lights on'], why: 'Parking at a passing place (mötesplats) is prohibited.' },
]

// Examples shown in the "Parking signs" part of the gallery.
export const PARKING_EXAMPLES = [
  { sign: 'parking', name: 'Parking', meaning: 'Max 24 hours on weekdays; no limit on Sundays and public holidays' },
  { sign: 'parking', panels: [['2 tim']], name: 'Time limit', meaning: 'Park for at most 2 hours' },
  { sign: 'parking', panels: [['Avgift'], ['8–18', '(8–14)', '!10–14']], name: 'Pay parking', meaning: 'Pay Mon–Fri 8–18, Saturdays 8–14, Sundays and holidays 10–14' },
  { sign: 'parking', panels: [['#disc', '2 tim']], name: 'Parking disc', meaning: 'Max 2 hours; set the disc to the next half hour after you arrive' },
  { sign: 'parking', panels: [['#disabled']], name: 'Disabled parking', meaning: 'Only with a disabled parking permit' },
  { sign: 'no-parking', name: 'No parking', meaning: 'You may stop to load or drop off passengers, but not park' },
  { sign: 'no-parking', panels: [['8–17']], name: 'No parking at set times', meaning: 'No parking Mon–Fri 8–17; other times allowed' },
  { sign: 'no-stopping', name: 'No stopping or parking', meaning: 'No stopping at all, not even to drop someone off' },
  { sign: 'no-parking-odd', name: 'No parking on odd dates', meaning: 'One bar: no parking on odd-numbered dates' },
  { sign: 'no-parking-even', name: 'No parking on even dates', meaning: 'Two bars: no parking on even-numbered dates' },
  { sign: 'parking-zone', name: 'No parking zone', meaning: 'No parking in the whole zone except where P signs allow it' },
  { sign: 'passing-place', name: 'Passing place', meaning: 'Keep it free: parking is not allowed' },
]
