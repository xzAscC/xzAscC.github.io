---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

A list of all the posts and pages found on the site. For you robots out there, there is an [XML version]({{ base_path }}/sitemap.xml) available for digesting as well.

<h2>Pages</h2>
{% comment %} site.pages also holds stylesheets, feeds, and redirect data; list only the home page and titled pages. {% endcomment %}
{% for post in site.pages %}
  {% if post.sitemap == false %}{% continue %}{% endif %}
  {% if post.url == "/" or post.title and post.title != "" %}{% include archive-single.html %}{% endif %}
{% endfor %}

<h2>Posts</h2>
{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  <h2>{{ label | capitalize }}</h2>
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
{% for post in collection.docs %}
  {% comment %} `sitemap: false` marks entries that only redirect, such as a paper whose project page is listed above. {% endcomment %}
  {% unless collection.output == false or collection.label == "posts" or post.sitemap == false %}
  {% include archive-single.html %}
  {% endunless %}
{% endfor %}
{% endfor %}
