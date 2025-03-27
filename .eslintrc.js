module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    // Отключаем необходимость явного импорта React в каждом файле с JSX
    // для проектов с React 17+ и настройкой "jsx": "react-jsx" в tsconfig
    'react/react-in-jsx-scope': 'off',
    
    // Запрещаем неиспользуемые переменные
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    
    // Обеспечиваем правильное использование хуков React
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Требуем использование типов props в компонентах
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    
    // Предупреждения об использовании any
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Отключаем правило для необходимости указания типа возвращаемого значения для функциональных компонентов
    '@typescript-eslint/explicit-function-return-type': 'off',
    
    // БЭМ нейминг для классов
    'react/no-unknown-property': ['error', { ignore: ['className'] }],
    
    // Импорты должны быть отсортированы
    'sort-imports': ['warn', {
      ignoreCase: true,
      ignoreDeclarationSort: true
    }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}; 