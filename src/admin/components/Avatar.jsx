import React, { useState } from 'react';

/**
 * Person avatar with a real fallback.
 *
 * `src ? <img> : <initial>` is not enough: most stored photo URLs resolve, but
 * the ones that 404 render as a broken-image icon with the alt text spilling
 * out of the circle. Falling back on the error event keeps every row looking
 * the same whether the file is there or not.
 */
export default function Avatar({ src, name, size = 40 }) {
  const [failed, setFailed] = useState(false);
  const initial = (name || '?').trim().charAt(0).toUpperCase() || '?';

  const style = { width: size, height: size };

  if (!src || failed) {
    return (
      <div className="admin-avatar-fallback" style={style} aria-hidden="true">
        {initial}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      style={{ ...style, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
