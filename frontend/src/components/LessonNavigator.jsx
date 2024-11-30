import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Collapse,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { lessons } from '../lessons';

const NavigatorContainer = styled(Box)`
  position: relative;
  z-index: 1;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const LessonPaper = styled(Paper)`
  background-color: rgba(0, 20, 0, 0.9) !important;
  margin-bottom: 16px;
  border: 1px solid #00ff00;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00ff00;
    box-shadow: 0 0 10px #00ff00;
  }
`;

const CodeBlock = styled(Box)`
  background-color: rgba(0, 40, 0, 0.9);
  padding: 16px;
  border-radius: 4px;
  margin: 8px 0;
  font-family: 'Courier New', monospace;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 255, 0, 0.1) 0%,
      rgba(0, 255, 0, 0) 100%
    );
    pointer-events: none;
  }
`;

export const LessonNavigator = () => {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);

  const handleLessonClick = (lessonId) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
    setExpandedTask(null);
  };

  const handleTaskClick = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <NavigatorContainer>
      <Typography variant="h4" gutterBottom sx={{ color: '#00ff00', textAlign: 'center' }}>
        Matrix Learning: Telegram Mini Apps
      </Typography>
      
      <List>
        {lessons.map((lesson) => (
          <LessonPaper key={lesson.id}>
            <ListItem
              button
              onClick={() => handleLessonClick(lesson.id)}
              sx={{ flexDirection: 'column', alignItems: 'stretch' }}
            >
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <ListItemText
                  primary={`Урок ${lesson.id}: ${lesson.title}`}
                  secondary={lesson.content}
                  primaryTypographyProps={{ sx: { color: '#00ff00' } }}
                  secondaryTypographyProps={{ sx: { color: '#00cc00' } }}
                />
                <IconButton sx={{ color: '#00ff00' }}>
                  {expandedLesson === lesson.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={expandedLesson === lesson.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {lesson.tasks.map((task) => (
                    <Box key={task.id}>
                      <ListItem
                        button
                        onClick={() => handleTaskClick(task.id)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText
                          primary={task.title}
                          secondary={task.description}
                          primaryTypographyProps={{ sx: { color: '#00ff00' } }}
                          secondaryTypographyProps={{ sx: { color: '#00cc00' } }}
                        />
                        <IconButton sx={{ color: '#00ff00' }}>
                          {expandedTask === task.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </ListItem>
                      
                      <Collapse in={expandedTask === task.id} timeout="auto" unmountOnExit>
                        <CodeBlock>
                          <pre style={{ color: '#00ff00', margin: 0 }}>
                            {task.code}
                          </pre>
                        </CodeBlock>
                      </Collapse>
                    </Box>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          </LessonPaper>
        ))}
      </List>
    </NavigatorContainer>
  );
};
