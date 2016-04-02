---
name: index
layout: page.html
---

<section class="section section_hero">
  <div class="hero">
    <div class="tagline">
      <h1 class="heading heading_main">
        My name is Dylan and I build cool things
      </h1>
    </div>
  </div>
</section>

<section class="section section_about">
  <h2 id="about" class="heading heading_sub heading_section">Me</h2>
  <div class="section__content">
    <div class="profile-image">
    </div>
    <div class="section_about__content">
      <p>
        For over 3 years I have had the privilege of working on some incredible
        projects with some of the most talented people. From design to delivery,
        I work closely with you to ensure complete satisfaction. Put simply,
        I love to build cool stuff.
      </p>
    </div>
    <p class="quote">
      A man may die, nations may rise and fall, but an idea lives on. - JFK
    </p>
  </div>
</section>

<section class="section section_projects">
  <h2 id="projects" class="heading heading_sub heading_section">My stuffs</h2>
  <div class="section__content section_projects__content">
    <div class="projects-list">
      {{#each projects as |project|}}
      <a data-track="type:link;label:{{project.name}} - external"href="{{project.site}}" target="_blank" class="link link_primary">
        <div id="{{project.name}}" class="projects-list__item" style="background-image: url('{{project.image}}');">
          <div class="projects-list__item__description">
            <p>{{project.description}}</p>
            <div class="projects-list__item__tags">
              {{#each project.tags as |tag|}}
              <span class="project-tag">{{tag}}</span>
              {{/each}}
            </div>
          </div>
        </div>
      </a>
      {{/each}}
    </div>
  </div>
</section>

<section class="section section_contact">
  <div class="map"></div>
  <h2 class="heading heading_sub heading_section" id="contact">Beep</h2>
  <div class="section__content section_contact__content">
    <form id="contact-form" class="form" action="http://formspree.io/dylan947@gmail.com" method="post">
      <div class="form__section form__section_input">
        <div class="form__group">
          <label class="form__label" for="name">Name</label>
          <input type="text" class="form__input" name="name" />
        </div>
        <div class="form__group">
          <label class="form__label" for="email">Email</label>
          <input type="email" class="form__input" name="email" />
        </div>
        <div class="form__group">
          <label class="form__label" for="type">Project type</label>
          <input type="text" class="form__input" name="projectType" />
        </div>
        <div class="form__group">
          <label class="form__label" for="budget">Budget</label>
          <input type="number" step=".1" min="100.00" class="form__input" name="projectBudget" />
        </div>
        <input type="hidden" name="_subject" value="New job request" />
        <input type="text" name="_gotcha" style="display:none" />
      </div>
      <div class="form__section form__section_actions">
        <div class="form__group form__group_social">
          <a class="link link_primary" href="https://twitter.com/dylfos" target="_blank">
            <i class="fa fa-twitter"></i>
          </a>
          <a class="link link_primary" href="https://facebook.com/dylan947" target="_blank">
            <i class="fa fa-facebook"></i>
          </a>
          <a class="link link_primary" href="https://github.com/dylanfoster" target="_blank">
            <i class="fa fa-github"></i>
          </a>
        </div>
        <div class="form__group form__group_submit">
          <button class="button button_primary" form="contact-form">
            Say hello!
          </button>
        </div>
      </div>
    </form>
  </div>
</section>
