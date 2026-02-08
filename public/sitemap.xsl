<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap &#8212; Pixarts</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Space+Grotesk:wght@500;700&amp;family=Megrim&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          <![CDATA[
            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: "Inter", system-ui, -apple-system, sans-serif;
              color: #FFFFFF;
              background: #0A0A0B;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              min-height: 100vh;
              position: relative;
              overflow-x: hidden;
            }

            ::selection {
              background: rgba(255, 107, 44, 0.3);
              color: #FFFFFF;
            }

            a { transition: all 0.2s ease; }

            /* ── Background Layer 1: Gradient Blobs ── */
            .bg-blobs {
              position: fixed;
              inset: 0;
              overflow: hidden;
              pointer-events: none;
              z-index: 0;
            }

            .bg-blob {
              position: absolute;
              border-radius: 50%;
              background: linear-gradient(135deg, #FF6B2C 0%, #FFB347 100%);
              filter: blur(80px);
              opacity: 0.18;
              animation: blob-drift 20s ease-in-out infinite alternate;
            }

            .bg-blob-1 {
              left: 10%; top: 15%;
              width: 600px; height: 600px;
              animation-duration: 22s;
            }

            .bg-blob-2 {
              left: 80%; top: 20%;
              width: 500px; height: 500px;
              transform: translate(-50%, -50%);
              animation-duration: 26s;
              animation-delay: -5s;
            }

            .bg-blob-3 {
              left: 40%; top: 60%;
              width: 700px; height: 700px;
              transform: translate(-50%, -50%);
              animation-duration: 18s;
              animation-delay: -10s;
            }

            .bg-blob-4 {
              left: 75%; top: 75%;
              width: 450px; height: 450px;
              transform: translate(-50%, -50%);
              animation-duration: 24s;
              animation-delay: -3s;
            }

            @keyframes blob-drift {
              0%   { transform: translate(-50%, -50%) scale(1); }
              50%  { transform: translate(-45%, -55%) scale(1.12); }
              100% { transform: translate(-55%, -48%) scale(0.95); }
            }

            /* ── Background Layer 2: Grain Texture ── */
            .bg-grain {
              position: fixed;
              inset: 0;
              pointer-events: none;
              z-index: 1;
              opacity: 0.03;
              mix-blend-mode: overlay;
            }

            /* ── Content layer ── */
            .container {
              position: relative;
              z-index: 2;
              max-width: 1100px;
              margin: 0 auto;
              padding: 48px 24px;
            }

            @media (prefers-reduced-motion: reduce) {
              .bg-blob { animation: none; }
            }

            .header {
              margin-bottom: 36px;
            }

            .brand {
              font-family: "Megrim", cursive;
              font-size: 24px;
              letter-spacing: 2px;
              text-decoration: none;
              display: inline-block;
              margin-bottom: 16px;
            }

            .brand .white { color: #FFFFFF; }
            .brand .orange { color: #FF6B2C; }

            .header h1 {
              font-family: "Space Grotesk", system-ui, sans-serif;
              font-size: 32px;
              font-weight: 700;
              color: #FFFFFF;
              margin-bottom: 10px;
              letter-spacing: -0.02em;
            }

            .header h1 span {
              background: linear-gradient(135deg, #FF6B2C, #FFB347);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }

            .header p {
              font-size: 14px;
              color: #8A8A8F;
              line-height: 1.6;
              max-width: 600px;
            }

            .header p a {
              color: #FF6B2C;
              text-decoration: none;
            }

            .header p a:hover {
              color: #FFB347;
            }

            .stats {
              display: flex;
              gap: 16px;
              margin-bottom: 28px;
              flex-wrap: wrap;
            }

            .stat {
              background: rgba(20, 20, 21, 0.7);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border: 1px solid #2A2A2D;
              border-radius: 12px;
              padding: 16px 24px;
              min-width: 130px;
            }

            .stat-label {
              font-size: 11px;
              font-weight: 500;
              color: #8A8A8F;
              text-transform: uppercase;
              letter-spacing: 0.8px;
            }

            .stat-value {
              font-family: "Space Grotesk", system-ui, sans-serif;
              font-size: 28px;
              font-weight: 700;
              background: linear-gradient(135deg, #FF6B2C, #FFB347);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin-top: 4px;
            }

            .table-wrapper {
              background: rgba(20, 20, 21, 0.6);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border: 1px solid rgba(42, 42, 45, 0.5);
              border-radius: 12px;
              overflow: hidden;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 14px;
            }

            thead th {
              background: #1C1C1E;
              padding: 14px 16px;
              text-align: left;
              font-weight: 600;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.8px;
              color: #8A8A8F;
              border-bottom: 1px solid #2A2A2D;
              white-space: nowrap;
            }

            tbody td {
              padding: 14px 16px;
              border-bottom: 1px solid rgba(42, 42, 45, 0.4);
              vertical-align: top;
              color: #C5C5CA;
            }

            tbody tr:last-child td {
              border-bottom: none;
            }

            tbody tr:hover {
              background: rgba(255, 107, 44, 0.04);
            }

            td.idx {
              color: #8A8A8F;
              font-size: 13px;
              font-weight: 500;
            }

            td.url {
              word-break: break-all;
            }

            td.url a {
              color: #FFFFFF;
              text-decoration: none;
              font-weight: 500;
            }

            td.url a:hover {
              color: #FF6B2C;
            }

            .priority-high {
              color: #FF6B2C;
              font-weight: 600;
            }

            .priority-medium {
              color: #FFB347;
              font-weight: 600;
            }

            .priority-low {
              color: #8A8A8F;
              font-weight: 500;
            }

            .changefreq {
              color: #8A8A8F;
              text-transform: capitalize;
            }

            .lastmod {
              color: #8A8A8F;
              font-variant-numeric: tabular-nums;
            }

            .alternates {
              display: flex;
              gap: 6px;
              flex-wrap: wrap;
              margin-top: 8px;
            }

            .lang-badge {
              display: inline-block;
              padding: 3px 10px;
              font-size: 10px;
              font-weight: 600;
              border-radius: 6px;
              background: rgba(255, 107, 44, 0.1);
              border: 1px solid rgba(255, 107, 44, 0.2);
              color: #FFB347;
              text-decoration: none;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .lang-badge:hover {
              background: rgba(255, 107, 44, 0.2);
              border-color: #FF6B2C;
              color: #FF6B2C;
            }

            .sitemap-footer {
              margin-top: 32px;
              padding-top: 20px;
              border-top: 1px solid #2A2A2D;
              text-align: center;
              font-size: 13px;
              color: #8A8A8F;
            }

            .sitemap-footer a {
              color: #FF6B2C;
              text-decoration: none;
              font-weight: 500;
            }

            .sitemap-footer a:hover {
              color: #FFB347;
            }

            .sitemap-footer .brand-footer {
              font-family: "Megrim", cursive;
              font-size: 17px;
              letter-spacing: 2px;
            }

            .sitemap-footer .brand-footer .white { color: #FFFFFF; }
            .sitemap-footer .brand-footer .orange { color: #FF6B2C; }

            @media (max-width: 768px) {
              .container { padding: 28px 16px; }
              .header h1 { font-size: 24px; }
              .stats { gap: 10px; }
              .stat { min-width: 100px; padding: 12px 16px; }
              .stat-value { font-size: 22px; }
              table { font-size: 13px; }
              thead th, tbody td { padding: 10px 12px; }
              .col-priority, .col-changefreq { display: none; }
            }
          ]]>
        </style>
      </head>
      <body>
        <!-- Background: Gradient Blobs -->
        <div class="bg-blobs" aria-hidden="true">
          <div class="bg-blob bg-blob-1"></div>
          <div class="bg-blob bg-blob-2"></div>
          <div class="bg-blob bg-blob-3"></div>
          <div class="bg-blob bg-blob-4"></div>
        </div>

        <!-- Background: Grain Texture -->
        <svg class="bg-grain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        <div class="container">
          <div class="header">
            <a class="brand" href="https://pixarts.eu"><span class="white">Pi</span><span class="orange">x</span><span class="white">arts</span></a>
            <h1>XML <span>Sitemap</span></h1>
            <p>
              This sitemap is used by search engines to discover and index pages on
              <a href="https://pixarts.eu">pixarts.eu</a>.
              Generated for better crawlability and SEO.
            </p>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="stat-label">URLs</div>
              <div class="stat-value">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)" />
              </div>
            </div>
            <div class="stat">
              <div class="stat-label">Languages</div>
              <div class="stat-value">3</div>
            </div>
          </div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 5%">#</th>
                  <th>URL</th>
                  <th class="col-priority" style="width: 10%">Priority</th>
                  <th class="col-changefreq" style="width: 12%">Frequency</th>
                  <th style="width: 12%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:sort select="sitemap:priority" order="descending" data-type="number" />
                  <tr>
                    <td class="idx">
                      <xsl:value-of select="position()" />
                    </td>
                    <td class="url">
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc" />
                      </a>
                      <xsl:if test="xhtml:link">
                        <div class="alternates">
                          <xsl:for-each select="xhtml:link[@rel='alternate']">
                            <a class="lang-badge" href="{@href}">
                              <xsl:value-of select="@hreflang" />
                            </a>
                          </xsl:for-each>
                        </div>
                      </xsl:if>
                    </td>
                    <td class="col-priority">
                      <xsl:choose>
                        <xsl:when test="sitemap:priority &gt;= 0.8">
                          <span class="priority-high"><xsl:value-of select="sitemap:priority" /></span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority &gt;= 0.5">
                          <span class="priority-medium"><xsl:value-of select="sitemap:priority" /></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="priority-low"><xsl:value-of select="sitemap:priority" /></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="col-changefreq changefreq">
                      <xsl:value-of select="sitemap:changefreq" />
                    </td>
                    <td class="lastmod">
                      <xsl:value-of select="sitemap:lastmod" />
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="sitemap-footer">
            <span class="brand-footer"><span class="white">Pi</span><span class="orange">x</span><span class="white">arts</span></span>
            <span> &#8212; </span>
            <a href="https://pixarts.eu">pixarts.eu</a>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
