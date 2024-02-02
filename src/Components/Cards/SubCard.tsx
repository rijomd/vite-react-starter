import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';

export type TypesSubCardProps = {
  children?: React.ReactElement;
  content?: boolean,
  contentClass?: string,
  contentSX?: any,
  sx?: any,
  darkTitle?: boolean,
  title?: string,
  secondary?: any
}

export const SubCard = (SubCardProps: TypesSubCardProps) => {

  const { children, content, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, } = SubCardProps;
  const theme = useTheme();

  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: theme.palette.primary.light,
        ':hover': { boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)' },
        ...sx
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h5">{title}</Typography>} action={secondary} />}
      {darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />}

      {/* content & header divider */}
      {title && (<Divider
        sx={{ opacity: 1, borderColor: theme.palette.primary.light }}
      />)}

      {/* card content */}
      {content && (<CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
        {children}
      </CardContent>)}

      {!content && children}

    </Card>
  );
};
