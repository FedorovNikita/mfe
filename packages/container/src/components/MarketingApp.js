import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  // Копия Browser History
  const history = useHistory()

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // это навигация из дочерних аппок
      onNavigate: ({ pathname: nextPathname }) => {
        // Получаем новый путь и берем текущий из контейнера.
        const { pathname } = history.location; 

        // Если пути различаются, что логично, когда внутри аппки мы перешли на другую страницу, то мы уведомляем Хоста об этом. Чтобы он тоже изменил current path
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      }
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
