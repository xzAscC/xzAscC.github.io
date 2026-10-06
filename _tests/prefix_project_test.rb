require 'cgi'
SITE = File.expand_path('../_site', __dir__)
def assert(condition, message)
  abort message unless condition
end
page = CGI.unescapeHTML(File.read(File.join(SITE, 'projects/prefix-steering/index.html')))
listing = CGI.unescapeHTML(File.read(File.join(SITE, 'publications/index.html')))
home = CGI.unescapeHTML(File.read(File.join(SITE, 'index.html')))
title = 'One Token Can Be Enough: Bridging Prompting and Activation Steering with Prefix Steering'
assert page.include?(title) && listing.include?(title), 'Paper must be present in project and publications pages'
assert listing.include?('/projects/prefix-steering/'), 'Publication must link the project page'
assert listing.include?('href="/projects/prefix-steering/" rel="permalink"'), 'Paper title must open the project page'
detail = File.read(File.join(SITE, 'publications/prefix-steering/index.html'))
assert detail.include?('http-equiv="refresh"') && detail.include?('/projects/prefix-steering/'), 'Old publication URL must redirect to the project page'
assert page.include?('class="project-resource" href="#citation" data-copy-citation'), 'Hero offers a BibTeX copy link'
assert page.include?('href="https://zhihuizhu.github.io/">Zhihui Zhu</a>'), 'Zhihui Zhu must link to his homepage'
assert page.include?('Zhihui Zhu') && page.include?('Xudong Zhu'), 'Project must credit both authors'
assert page.include?('fixed-state') && page.include?('often'), 'Project must preserve the scope of the paper claims'
assert !page.include?('2601.00000') && !page.include?('your-project'), 'Project must not retain template placeholders'
assert page.include?('https://arxiv.org/abs/2610.04967') && listing.include?('https://arxiv.org/abs/2610.04967'), 'Link the arXiv paper from the project and publications pages'
assert !page.include?('noindex, nofollow'), 'Published paper page should be indexable'
assert page.include?('data-theme-toggle'), 'Keep the template theme switch'
assert page.include?('id="citation"') && page.include?('eprint={2610.04967}'), 'Cite the arXiv submission'
page.scan(/(?:href|src)="(\/[^"]+)"/).flatten.each do |url|
  path = url.split(/[?#]/).first
  path += 'index.html' if path.end_with?('/')
  assert File.file?(File.join(SITE, path)), "Missing local project resource: #{url}"
end
nav = page[%r{<nav class="project-nav".*?</nav>}m]
nav.scan(/href="#([\w-]+)"/).flatten.each do |id|
  assert page.include?(%(id="#{id}")), "Missing navigation target: #{id}"
end
working = home[%r{<section class="showcase-section showcase-section--preprints".*?</section>}m]
assert working && working.include?(title), 'arXiv preprint belongs in preprints'
assert !home[%r{<section class="showcase-section showcase-section--publications".*?</section>}m].include?(title), 'Preprint must not be labeled peer reviewed'

assert !page.include?('class="project-eyebrow"'), 'Prefix page should omit the template status label'
authors = page[%r{<ul class="project-authors".*?</ul>}m]
affiliations = page[%r{<ul class="project-affiliations".*?</ul>}m]
assert !authors.include?('<sup>') && !affiliations.include?('<sup>'), 'A shared affiliation needs no numeric markers'
overview = page[%r{<section class="prefix-overview".*?</section>}m]
assert overview && overview.include?('data-duration-chart') && overview.include?('OLMo 3 7B'), 'Overview should chart the duration trade-off and name its setting'
assert overview.include?('fixed-state attention assumptions'), 'Overview must keep the scope of the matching result'
assert overview.scan('<tr>').length == 19, 'Overview data table should list 15 prefix lengths, full, prompting, unsteered, and a header'
assert !page.include?('class="project-teaser"'), 'The split overview replaces the single teaser figure'

body = page[%r{<div class="project-body".*?<section id="paper"}m]
assert !body.include?('class="paper-figure"'), 'Every figure is redrawn as a native chart'
%w[data-matching-geometry data-dim-chart data-models-chart].each { |hook| assert body.include?(hook), "Missing native chart: #{hook}" }
assert body.include?('prefix-attention-matching-figure.pdf') && body.include?('prefix-models-tasks-figure.pdf'), 'Keep links to the paper figures'
order = ['id="connection"', 'id="duration"', 'id="results"'].map { |id| body.index(id) }
assert order.all? && order == order.sort, 'Follow the paper: connection, then duration and strength, then cross-model results'
assert body.include?('data-strength-chart') && body.include?('data-matching-chart'), 'Duration section should chart strength trade-off and Lemma 5 matching'
assert body.include?('policy-table') && body.include?('It depends on the task'), 'Results should report strength policies and the task-dependent comparison with prompting'
assert !body.include?('project-steps') && !body.include?('project-facts'), 'Remove the long method walkthrough and statistics cards'
assert body.include?('linear error bound'), 'Describe a linear upper bound, not guaranteed linear growth'
footer = page[%r{<footer class="project-footer".*?</footer>}m]
assert footer.include?('Xudong Zhu') && !footer.include?('Zhihui Zhu'), 'Page footer must credit its creator only'
puts 'Prefix project checks passed.'
