<template>
  <header class="header fixed-top" style="width: 100% !important">	    
		<nav class="navbar navbar-expand-lg branding docs-branding static-top">
  		<div class="container">
    		<a class="navbar-brand" href="#">
          <img class="logo-icon mr-2" src="@/assets/frontend/images/coderdocs-logo.svg" alt="logo">
					<span class="logo-text">Amol<span class="text-alt"> AHER</span></span>
        </a>
    		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    		<div class="collapse navbar-collapse" id="navbarResponsive">
      		<ul class="navbar-nav ml-auto">
        		<li class="nav-item active"><router-link :to="{ name: 'home' }" class='nav-link'>Home</router-link></li>
						<li class="nav-item active"><router-link :to="{ name: 'profile' }" class='nav-link'>Profile</router-link></li>
						<li class="nav-item active"><router-link :to="{ name: 'abilities' }" class='nav-link'>Abilities</router-link></li>
						<li class="nav-item active"><router-link :to="{ name: 'education' }" class='nav-link'>Education</router-link></li>
						<li class="nav-item active"><router-link :to="{ name: 'career' }" class='nav-link'>Career</router-link></li>
						<li class="nav-item active"><router-link :to="{ name: 'blogs' }" class='nav-link'>Blogs</router-link></li>
						<li class="nav-item active"><router-link :to="{ name: 'contact' }" class='nav-link'>Contact</router-link></li>
      		</ul>
    		</div>
  		</div>
		</nav>
  </header>
</template>

