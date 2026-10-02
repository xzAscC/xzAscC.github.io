"""Export the built, unpublished project demo as a portable static template.

Usage: python scripts/export_project_template.py BUILT_SITE [OUTPUT_ZIP]
Build Jekyll with --unpublished first. No server or Jekyll is needed for the export.
"""
from pathlib import Path
import re
import sys
from zipfile import ZipFile, ZIP_DEFLATED

site = Path(sys.argv[1])
output = Path(sys.argv[2]) if len(sys.argv) > 2 else Path('files/project-template.zip')
html = (site / 'templates/project/index.html').read_text()
html = html.replace('href="/assets/', 'href="assets/').replace('src="/assets/', 'src="assets/')
html = html.replace('href="/files/', 'href="files/').replace('src="/files/', 'src="files/')
html = re.sub(r'<meta property="og:url" content="[^"]*">', '<meta property="og:url" content="https://your-project.example/">', html)
assert not re.search(r'(?:src|href)="/(?:assets|files)/', html), 'Export contains root-relative asset URLs'
readme = '''# Research Project Page Template

A responsive research project page with a shared PDF viewer and a copyable citation.

1. Edit `index.html`: replace the title, authors, affiliations, resource links, text, BibTeX, and the `og:` link-preview tags.
2. Replace `assets/images/project-template-overview.svg`, `files/arxiv-template-example.pdf`, and its first-page preview `assets/images/arxiv-template-preview.svg` (shown on phones that cannot display PDFs inline).
3. Change the accent color with `--project-accent` on `<body>`; hover, soft, and dark-mode shades follow. Adjust spacing in `assets/css/project.css`.
4. Preview with `python -m http.server 8000`, then open http://localhost:8000/.
5. Remove the `noindex, nofollow` meta tag when ready to publish. Upload the folder to any static host.

This is a static HTML/CSS/JS template. No build step or framework is required.
The PDF stays vector-based and uses the browser's built-in viewer; the Open link works when embedding is unavailable.

The PDF viewer's canonical Jekyll source is `_includes/pdf-viewer.html` with `_sass/editorial/_pdf-viewer.scss` in the website repository. The export uses that same component, with its styles compiled into project.css.

MIT licensed. The bundled PDF is a sample from https://github.com/xzAscC/arxiv-template.
The Ohio State University logo in that sample is excluded from the license; replace the PDF before publishing your own project.
'''
license_text = Path('LICENSE').read_text().replace('Copyright (c) 2016 Michael Rose', 'Copyright (c) 2026 Xudong Zhu\nCopyright (c) 2016 Michael Rose')
assets = ['assets/css/project.css', 'assets/js/project.js', 'assets/images/project-template-overview.svg', 'assets/images/arxiv-template-preview.svg', 'files/arxiv-template-example.pdf']
with ZipFile(output, 'w', compression=ZIP_DEFLATED) as archive:
    archive.writestr('index.html', html)
    archive.writestr('README.md', readme)
    archive.writestr('LICENSE', license_text)
    archive.writestr('ARXIV-LICENSE', Path('LICENSE').read_text().replace('Copyright (c) 2016 Michael Rose', 'Copyright (c) 2026 arXiv Template contributors'))
    for name in assets:
        archive.write(site / name, name)
print(f'Exported {output}')
