<template>
  <div class="min-h-screen text-default-900">
    <!-- Navigasi -->
    <header class="sticky top-0 z-10 border-b border-default-200 bg-card/90 backdrop-blur">
      <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span class="font-semibold">{{ profile.name }}</span>
        <div class="hidden gap-6 text-sm font-medium text-default-600 md:flex">
          <a href="#about" class="hover:text-primary">About</a>
          <a href="#experience" class="hover:text-primary">Experience</a>
          <a href="#skills" class="hover:text-primary">Skills</a>
          <a href="#education" class="hover:text-primary">Education</a>
          <a href="#contact" class="hover:text-primary">Contact</a>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-5xl space-y-20 px-6 py-16">
      <!-- Hero -->
      <section class="pt-6">
        <p class="text-sm font-medium text-primary">{{ profile.location }}</p>
        <h1 class="mt-3 text-4xl font-semibold md:text-5xl">{{ profile.name }}</h1>
        <p class="mt-4 text-xl text-default-600">{{ profile.headline }}</p>
        <p class="mt-6 max-w-3xl text-default-500">{{ profile.summary }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a :href="`mailto:${profile.email}`" class="btn bg-primary text-white">Email me</a>
          <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="btn border border-default-200 text-default-800">LinkedIn</a>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="scroll-mt-24">
        <h2 class="mb-6 text-2xl font-semibold">About</h2>
        <div class="space-y-4 text-default-600">
          <p v-for="(paragraph, i) in profile.about" :key="i">{{ paragraph }}</p>
        </div>
      </section>

      <!-- Experience -->
      <section id="experience" class="scroll-mt-24">
        <h2 class="mb-6 text-2xl font-semibold">Experience</h2>
        <ol class="space-y-8 border-l border-default-200 pl-6">
          <li v-for="job in experience" :key="job.role + job.company" class="relative">
            <span class="absolute -left-[31px] top-1.5 size-3 rounded-full bg-primary"></span>
            <h3 class="text-lg font-semibold">{{ job.role }}</h3>
            <p class="text-default-600">{{ job.company }} · {{ job.type }}</p>
            <p class="text-sm text-default-500">{{ job.period }} · {{ job.location }}</p>
            <ul class="mt-3 list-disc space-y-1 pl-5 text-default-600">
              <li v-for="item in job.highlights" :key="item">{{ item }}</li>
            </ul>
          </li>
        </ol>
      </section>

      <!-- Skills -->
      <section id="skills" class="scroll-mt-24">
        <h2 class="mb-6 text-2xl font-semibold">Skills</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="card p-6">
            <h3 class="mb-4 font-semibold">Technical</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in skills.technical" :key="s" class="rounded-md border border-default-200 px-3 py-1 text-sm">{{ s }}</span>
            </div>
          </div>
          <div class="card p-6">
            <h3 class="mb-4 font-semibold">Non-technical</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in skills.nonTechnical" :key="s" class="rounded-md border border-default-200 px-3 py-1 text-sm">{{ s }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Education, certificates, languages -->
      <section id="education" class="scroll-mt-24 grid gap-6 md:grid-cols-3">
        <div class="card p-6 md:col-span-1">
          <h3 class="mb-4 font-semibold">Education</h3>
          <div v-for="edu in education" :key="edu.degree">
            <p class="font-medium">{{ edu.degree }}</p>
            <p class="text-default-600">{{ edu.school }}</p>
            <p class="text-sm text-default-500">{{ edu.period }}<span v-if="edu.gpa"> · {{ edu.gpa }}</span></p>
          </div>
        </div>
        <div class="card p-6">
          <h3 class="mb-4 font-semibold">Certificates</h3>
          <ul class="list-disc space-y-1 pl-5 text-default-600">
            <li v-for="c in certificates" :key="c">{{ c }}</li>
          </ul>
        </div>
        <div class="card p-6">
          <h3 class="mb-4 font-semibold">Languages</h3>
          <ul class="space-y-1 text-default-600">
            <li v-for="l in languages" :key="l.name">{{ l.name }} - {{ l.level }}</li>
          </ul>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="scroll-mt-24 text-center">
        <h2 class="mb-4 text-2xl font-semibold">Contact</h2>
        <p class="mb-6 text-default-500">Open to discussing web development and IT support opportunities.</p>
        <div class="flex flex-wrap justify-center gap-3">
          <a :href="`mailto:${profile.email}`" class="btn bg-primary text-white">{{ profile.email }}</a>
          <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="btn border border-default-200 text-default-800">LinkedIn</a>
        </div>
      </section>
    </main>

    <footer class="border-t border-default-200 px-6 py-6 text-center text-sm text-default-500">
      &copy; {{ currentYear }} {{ profile.name }}
    </footer>
  </div>
</template>

<script setup lang="ts">
import { profile, experience, education, skills, certificates, languages } from '~/data/cv'
import { currentYear } from '~/helpers'

useHead({
  title: `${profile.name} | ${profile.headline}`,
  meta: [
    { name: 'description', content: profile.summary }
  ]
})
</script>
