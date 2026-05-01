<?php declare(strict_types=1);
/**
 * @color-tokens/core — Reusable Footer Component
 */
?>
  </main>

  <!-- ─── Footer ────────────────────────────────────────────── -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="<?= $baseUrl ?? '.' ?>" class="logo">
            <span class="logo-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="8" cy="8" r="5" fill="#3B82F6"/>
                <circle cx="24" cy="8" r="5" fill="#A855F7"/>
                <circle cx="8" cy="24" r="5" fill="#22C55E"/>
                <circle cx="24" cy="24" r="5" fill="#F97316"/>
              </svg>
            </span>
            <span class="logo-text">@color-tokens/core</span>
          </a>
          <p class="footer-tagline">
            Universal color token system for React &amp; React Native.
          </p>
        </div>

        <div class="footer-links">
          <h4>Resources</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#palette">Color Palette</a></li>
            <li><a href="#examples">Code Examples</a></li>
            <li><a href="#install">Installation</a></li>
          </ul>
        </div>

        <div class="footer-links">
          <h4>Package</h4>
          <ul>
            <li>
              <a href="https://www.npmjs.com/package/@color-tokens/core" target="_blank" rel="noopener noreferrer">
                npm @color-tokens/core
              </a>
            </li>
            <li>
              <a href="https://github.com/your-org/color-tokens" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </li>
            <li>
              <a href="https://github.com/your-org/color-tokens/issues" target="_blank" rel="noopener noreferrer">
                Report an Issue
              </a>
            </li>
            <li>
              <a href="https://github.com/your-org/color-tokens/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
                MIT License
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-links">
          <h4>Community</h4>
          <ul>
            <li><a href="https://github.com/your-org/color-tokens/discussions" target="_blank" rel="noopener noreferrer">Discussions</a></li>
            <li><a href="https://github.com/your-org/color-tokens/releases" target="_blank" rel="noopener noreferrer">Releases</a></li>
            <li><a href="https://github.com/your-org/color-tokens/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">Changelog</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; <?= date('Y') ?> Color Tokens Contributors. Licensed under the MIT License.</p>
        <p>Built with care for the React &amp; React Native communities.</p>
      </div>
    </div>
  </footer>

  <script src="<?= $baseUrl ?? '.' ?>/js/main.js"></script>
</body>
</html>
