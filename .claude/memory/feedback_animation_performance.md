---
name: Alertar sobre performance de animações
description: Usuário quer ser sempre alertado quando uma animação pode ter custo de performance significativo
type: feedback
---

Sempre alertar quando uma animação proposta pode ser custosa.

**Why:** Usuário pediu explicitamente para ser avisado sobre custo de animações.

**How to apply:** Ao sugerir ou implementar qualquer animação, mencionar se ela é barata (GPU: transform/opacity) ou potencialmente pesada (reflow: width/height/top/left, filter: blur em elementos grandes, box-shadow animado, muitos AnimatePresence simultâneos).
