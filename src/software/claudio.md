#Claudio
CLAUDIO, the tool for "**C**ross-**L**inking **A**nalysis **U**sing **Di**stances and **O**verlaps", allows for an in-depth evaluation of structure and sequence information, automating necessary post-experiment analysis.
 It downloads protein structures for this, and returns protein-link-specific small-datasets containing structural restraints in CSV-format, and the input dataset extended by its results. These include:

- PDB IDs of protein structures searched by BLASTP
- Mapping of UniProt protein to structure sequence positions
- Structural distances calculated with TopoLink
- Information on Homo-signal responses (e.g. overlapping peptide sequences in same-protein cross-links)
- Information on possible oligomeric states discovered by SWISS-MODEL homology
- Cross-link type estimations

Repository: https://github.com/KohlbacherLab/CLAUDIO