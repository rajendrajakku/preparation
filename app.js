function renderQuestions(data, containerId, countId) {
  const container = document.getElementById(containerId);
  const noResults = document.createElement('div');
  noResults.className = 'no-results';
  noResults.textContent = 'No questions match your search.';

  function esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  data.forEach((item, i) => {
    const details = document.createElement('details');
    details.className = 'qitem';

    const summary = document.createElement('summary');
    const numSpan = document.createElement('span');
    numSpan.className = 'qnum';
    numSpan.textContent = String(i + 1).padStart(3, '0');
    const qText = document.createElement('span');
    qText.textContent = item.q;
    summary.appendChild(numSpan);
    summary.appendChild(qText);
    details.appendChild(summary);

    const body = document.createElement('div');
    body.className = 'qbody';

    const answer = document.createElement('p');
    answer.className = 'answer';
    answer.textContent = item.a;
    body.appendChild(answer);

    if (item.ex) {
      const tag = document.createElement('span');
      tag.className = 'example-tag';
      tag.textContent = 'EXAMPLE';
      body.appendChild(tag);

      if (item.code) {
        const pre = document.createElement('pre');
        const codeEl = document.createElement('code');
        codeEl.innerHTML = esc(item.ex);
        pre.appendChild(codeEl);
        body.appendChild(pre);
      } else {
        const p = document.createElement('p');
        p.className = 'example-text';
        p.textContent = item.ex;
        body.appendChild(p);
      }
    }

    details.appendChild(body);
    details._searchText = (item.q + ' ' + item.a + ' ' + (item.ex || '')).toLowerCase();
    container.appendChild(details);
  });

  container.parentElement.appendChild(noResults);

  if (countId) {
    document.getElementById(countId).textContent = data.length + ' questions';
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;
      container.querySelectorAll('.qitem').forEach(el => {
        const match = el._searchText.includes(term);
        el.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  }

  const expandBtn = document.getElementById('expandAll');
  const collapseBtn = document.getElementById('collapseAll');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      container.querySelectorAll('.qitem').forEach(el => el.open = true);
    });
  }
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      container.querySelectorAll('.qitem').forEach(el => el.open = false);
    });
  }
}
