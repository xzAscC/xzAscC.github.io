#!/bin/sh
set -eu

bundle exec jekyll build
ruby _tests/domain_configuration_test.rb
ruby _tests/structural_content_test.rb
