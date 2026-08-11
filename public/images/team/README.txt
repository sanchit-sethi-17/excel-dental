TEAM PHOTOS
===========

The three consultant photos live here, under these exact filenames:

    dr-esha.png
    dr-amit-narang.png
    dr-varun-goyal.png

To swap any of them, just overwrite the file with the same name — the site
picks it up automatically. If a file is missing, the consultants page shows a
neat monogram (initials) instead, so nothing ever looks broken.

Notes
-----
- Filenames and extensions are set in src/lib/doctors.ts. If you supply a
  different format (.jpg/.webp), that path needs updating to match.
- Photos are cropped to a 4:5 portrait. The crop is tuned per doctor with the
  `focus` field in src/lib/doctors.ts — currently "object-left" for Dr. Esha
  (she sits left in frame) and "object-top" for Dr. Amit.
- The current files are 400–450px wide, which is on the small side and will
  look slightly soft on high-resolution screens. If the clinic can supply the
  originals at 800px+ wide, drop them in and they'll sharpen up.
