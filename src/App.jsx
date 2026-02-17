import React, { useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import ToDoList from "./ToDoLists";

// Create theme context
const ThemeContext = createContext();

// Light theme configuration
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#7c3aed",
      contrastText: "#ffffff",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      disabled: "#94a3b8",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h4: {
      fontSize: "1.875rem",
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      "@media (max-width:600px)": {
        fontSize: "0.9rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      "@media (max-width:600px)": {
        fontSize: "0.8rem",
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
          padding: "10px 20px",
          fontSize: "0.875rem",
          transition: "all 0.2s ease-in-out",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          },
          "@media (max-width:600px)": {
            padding: "8px 16px",
            fontSize: "0.8rem",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          "@media (max-width:600px)": {
            borderRadius: 16,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          },
          "@media (max-width:600px)": {
            borderRadius: 12,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.9)",
            },
            "&.Mui-focused": {
              background: "rgba(255, 255, 255, 1)",
            },
            "@media (max-width:600px)": {
              borderRadius: 8,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          fontSize: "0.75rem",
          height: 32,
          backdropFilter: "blur(5px)",
          "@media (max-width:600px)": {
            height: 28,
            fontSize: "0.7rem",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "@media (max-width:600px)": {
            padding: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#1e293b",
          "@media (max-width:600px)": {
            "& .MuiToolbar-root": {
              minHeight: 56,
              paddingLeft: 12,
              paddingRight: 12,
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (max-width:600px)": {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          "@media (max-width:600px)": {
            margin: 16,
            maxWidth: "calc(100% - 32px)",
            borderRadius: 16,
          },
        },
      },
    },
  },
});

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#818cf8",
      light: "#a5b4fc",
      dark: "#6366f1",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a78bfa",
      light: "#c4b5fd",
      dark: "#8b5cf6",
      contrastText: "#ffffff",
    },
    success: {
      main: "#34d399",
      light: "#6ee7b7",
      dark: "#10b981",
    },
    warning: {
      main: "#fbbf24",
      light: "#fcd34d",
      dark: "#f59e0b",
    },
    error: {
      main: "#f87171",
      light: "#fca5a5",
      dark: "#ef4444",
    },
    info: {
      main: "#60a5fa",
      light: "#93c5fd",
      dark: "#3b82f6",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#cbd5e1",
      disabled: "#64748b",
    },
    divider: "#334155",
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h4: {
      fontSize: "1.875rem",
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      "@media (max-width:600px)": {
        fontSize: "0.9rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      "@media (max-width:600px)": {
        fontSize: "0.8rem",
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
          padding: "10px 20px",
          fontSize: "0.875rem",
          transition: "all 0.2s ease-in-out",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          },
          "@media (max-width:600px)": {
            padding: "8px 16px",
            fontSize: "0.8rem",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          background: "rgba(30, 41, 59, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          "@media (max-width:600px)": {
            borderRadius: 16,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "rgba(30, 41, 59, 0.9)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          },
          "@media (max-width:600px)": {
            borderRadius: 12,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(5px)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              background: "rgba(30, 41, 59, 0.9)",
            },
            "&.Mui-focused": {
              background: "rgba(30, 41, 59, 1)",
            },
            "@media (max-width:600px)": {
              borderRadius: 8,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          fontSize: "0.75rem",
          height: 32,
          backdropFilter: "blur(5px)",
          "@media (max-width:600px)": {
            height: 28,
            fontSize: "0.7rem",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "@media (max-width:600px)": {
            padding: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(30, 41, 59, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#f1f5f9",
          "@media (max-width:600px)": {
            "& .MuiToolbar-root": {
              minHeight: 56,
              paddingLeft: 12,
              paddingRight: 12,
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (max-width:600px)": {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          background: "rgba(30, 41, 59, 0.98)",
          backdropFilter: "blur(20px)",
          "@media (max-width:600px)": {
            margin: 16,
            maxWidth: "calc(100% - 32px)",
            borderRadius: 16,
          },
        },
      },
    },
  },
});

// Custom hook for theme management
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

const App = () => {
  const [mode, setMode] = useState(() => {
    // Get saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme || 'light';
  });

  // Toggle theme function
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Apply theme to document body
  useEffect(() => {
    document.body.style.background = mode === 'light' 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
  }, [mode]);

  // Theme context value
  const themeContextValue = {
    mode,
    toggleTheme,
    theme: mode === 'light' ? lightTheme : darkTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={themeContextValue.theme}>
        <CssBaseline />
        <ToDoList />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
