#!/bin/sh
set -eu

bundle exec jekyll build
ruby _tests/domain_configuration_test.rb
ruby _tests/structural_content_test.rb
bundle exec jekyll build --unpublished --destination local/project-site
ruby _tests/project_template_test.rb
