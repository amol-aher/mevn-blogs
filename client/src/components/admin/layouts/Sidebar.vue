<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <!-- ### $Sidebar Header ### -->
      <div class="sidebar-logo">
        <div class="peers ai-c fxw-nw">
          <div class="peer peer-greed">
            <a class="sidebar-link td-n" href="index.html">
              <div class="peers ai-c fxw-nw">
                <div class="peer">
                  <div class="logo">
                    <img src="@/assets/admin/static/images/logo.png" alt="">
                  </div>
                </div>
                <div class="peer peer-greed">
                  <h5 class="lh-1 mB-0 logo-text">Blogs</h5>
                </div>
              </div>
            </a>
          </div>
          <div class="peer">
            <div class="mobile-toggle sidebar-toggle">
              <a href="" class="td-n">
                <i class="ti-arrow-circle-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ### $Sidebar Menu ### -->
      <ul class="sidebar-menu scrollable pos-r">
        <li class="nav-item mT-30 actived">
          <a class="sidebar-link" href="/admin/dashboard">
            <span class="icon-holder">
              <i class="c-blue-500 ti-home"></i>
            </span>
            <span class="title">Dashboard</span>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="dropdown-toggle" href="javascript:void(0);">
            <span class="icon-holder">
              <i class="c-orange-500 ti-layout-list-thumb"></i>
            </span>
            <span class="title">Blog</span>
            <span class="arrow">
              <i class="ti-angle-right"></i>
            </span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/admin/categories" class='sidebar-link'>Categories</router-link>
            </li>
            <li>
              <router-link to="/admin/blogs" class='sidebar-link'>Blogs</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>