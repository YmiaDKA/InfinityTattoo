-- Starting data based on infinitytattoo.no. Staff emails are filled in when Cloudflare Access is set up.
-- studio_share_pct starts at 0; the owner sets the real split in the admin.

INSERT INTO staff (id, name, role, color, bookable) VALUES
  (1, 'Filip', 'owner', '#b91c1c', 1),
  (2, 'Nora', 'piercer', '#a855f7', 1);

INSERT INTO services (id, name_no, name_en, kind, duration_min, price_ore, deposit_ore, requires_approval, sort) VALUES
  (1, 'Konsultasjon', 'Consultation', 'consultation', 30, 0, 0, 0, 10),
  (2, 'Tatovering (forespørsel)', 'Tattoo (request)', 'tattoo', 180, NULL, 0, 1, 20),
  (3, 'Piercing – øreflipp', 'Piercing – lobe', 'piercing', 30, 50000, 0, 0, 30),
  (4, 'Piercing – brusk (helix, tragus, conch, flat)', 'Piercing – cartilage (helix, tragus, conch, flat)', 'piercing', 30, 70000, 0, 0, 31),
  (5, 'Piercing – daith, rook, industrial', 'Piercing – daith, rook, industrial', 'piercing', 45, 80000, 0, 0, 32),
  (6, 'Piercing – ansikt (nese, øyebryn, leppe)', 'Piercing – face (nostril, eyebrow, lip)', 'piercing', 30, 70000, 0, 0, 33),
  (7, 'Piercing – septum, bridge, tunge, navle', 'Piercing – septum, bridge, tongue, navel', 'piercing', 45, 80000, 0, 0, 34),
  (8, 'Tooth gem', 'Tooth gem', 'tooth_gem', 30, 30000, 0, 0, 40);

INSERT INTO staff_services (staff_id, service_id) VALUES
  (1, 1), (1, 2),
  (2, 1), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8);

-- Opening hours from the website: Tu–Fr 11–18, Sa–Su 11–16, Monday closed.
INSERT INTO working_hours (staff_id, weekday, start_time, end_time) VALUES
  (1, 2, '11:00', '18:00'), (1, 3, '11:00', '18:00'), (1, 4, '11:00', '18:00'), (1, 5, '11:00', '18:00'),
  (1, 6, '11:00', '16:00'), (1, 7, '11:00', '16:00'),
  (2, 2, '11:00', '18:00'), (2, 3, '11:00', '18:00'), (2, 4, '11:00', '18:00'), (2, 5, '11:00', '18:00'),
  (2, 6, '11:00', '16:00'), (2, 7, '11:00', '16:00');
