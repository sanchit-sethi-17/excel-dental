TEAM PHOTOS
===========

Save the three consultant photos in this folder with these exact filenames:

    dr-esha.jpg
    dr-amit-narang.jpg
    dr-varun-goyal.jpg

That's all — the site picks them up automatically. Until a file is here, the
consultants page shows a neat monogram (initials) instead, so nothing looks
broken.

Notes
-----
- .jpg is expected. If you only have .png or .webp, either convert it, or tell
  the developer and the path in src/lib/doctors.ts can be changed.
- Photos are cropped to a 4:5 portrait, centred. If someone's head gets cut off,
  the crop can be nudged with the `focus` field in src/lib/doctors.ts
  (e.g. "object-top").
- Best results: portrait orientation, face in the upper half, at least 800px
  wide. Landscape photos will be cropped in from the sides.
