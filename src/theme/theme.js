import { createTheme } from "@mui/material/styles";
export default createTheme({
  palette:{
    primary:{main:"#D50F35",dark:"#B90C2D",light:"#FFF0F3",contrastText:"#fff"},
    secondary:{main:"#212121",contrastText:"#fff"},
    background:{default:"#F8F7F5",paper:"#FFFFFF"},
    text:{primary:"#212121",secondary:"#667085"},
    success:{main:"#208A5A"},warning:{main:"#A56A00"},error:{main:"#B42318"}
  },
  typography:{fontFamily:'Poppins, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',h1:{fontWeight:800,letterSpacing:"-.05em"},h2:{fontWeight:800,letterSpacing:"-.045em"},h3:{fontWeight:800,letterSpacing:"-.03em"},button:{textTransform:"none",fontWeight:800}},
  shape:{borderRadius:16},
  components:{
    MuiButton:{styleOverrides:{root:{borderRadius:14,minHeight:44}}},
    MuiCard:{styleOverrides:{root:{borderRadius:22,boxShadow:"0 12px 36px rgba(33,33,33,.08)"}}},
    MuiTextField:{defaultProps:{size:"small"}},
    MuiChip:{styleOverrides:{root:{borderRadius:999,fontWeight:700}}}
  }
});
