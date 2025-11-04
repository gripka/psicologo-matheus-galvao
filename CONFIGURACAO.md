# 🚀 Checklist de Configuração - Domínio Próprio

## ✅ Já Configurado

- [x] Favicon e ícones para todos os dispositivos
- [x] Meta tags SEO otimizadas
- [x] Open Graph (Facebook, LinkedIn)
- [x] Twitter Cards
- [x] Structured Data (JSON-LD) para Google
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Web App Manifest
- [x] Canonical URL apontando para matheusngalvao.com.br

## 📋 Próximos Passos

### 1. Configurar DNS
- [ ] Apontar domínio matheusngalvao.com.br para seu servidor
- [ ] Configurar certificado SSL (HTTPS)
- [ ] Redirecionar www.matheusngalvao.com.br para matheusngalvao.com.br

### 2. Atualizar Links das Redes Sociais
Edite `index.html` e substitua:
- [ ] Instagram: `@seuperfil` → seu perfil real
- [ ] YouTube: `@seucanal` → seu canal real
- [ ] TikTok: `@seuperfil` → seu perfil real

### 3. Configurar Google Analytics (Opcional)
1. Crie conta em: https://analytics.google.com
2. Obtenha seu ID (exemplo: G-XXXXXXXXXX)
3. Veja instruções em: `google-analytics.html`
4. Cole o código no `<head>` do `index.html`

### 4. Google Search Console
1. Acesse: https://search.google.com/search-console
2. Adicione sua propriedade: https://matheusngalvao.com.br
3. Verifique a propriedade
4. Envie o sitemap: https://matheusngalvao.com.br/sitemap.xml

### 5. Teste SEO
Após o DNS propagar, teste em:
- [ ] https://pagespeed.web.dev/ (Performance)
- [ ] https://search.google.com/test/rich-results (Dados estruturados)
- [ ] https://www.opengraph.xyz/ (Preview compartilhamento)
- [ ] https://cards-dev.twitter.com/validator (Twitter Card)

### 6. Backup
- [ ] Mantenha backup regular dos arquivos
- [ ] Configure backup automático no servidor

## 📱 Imagens Necessárias

Verifique se todas as imagens estão na pasta `images/`:
- [ ] foto-hero.jpg (foto principal)
- [ ] foto-sobre.jpg (seção sobre)
- [ ] foto-interesses.jpg (seção interesses)
- [ ] carrossel-1.jpg até carrossel-12.jpg

## 🔧 Configurações do Servidor

### Recomendações de .htaccess (Apache)
```apache
# Forçar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirecionar www para não-www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 📊 Monitoramento

Após o site estar no ar:
- [ ] Monitorar erros no console do navegador
- [ ] Verificar carregamento de imagens
- [ ] Testar em diferentes dispositivos
- [ ] Verificar velocidade de carregamento
- [ ] Monitorar Google Analytics (se configurado)

## 🎯 Melhorias Futuras (Opcional)

- [ ] Blog para conteúdos sobre psicologia
- [ ] Sistema de agendamento online
- [ ] Chat ao vivo
- [ ] Depoimentos de pacientes
- [ ] Vídeos informativos
- [ ] Newsletter

---

**Última atualização:** 03/11/2025
