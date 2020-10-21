/*
 * This class contains a lot of the code to provide the functionality of the servlet.
 * Use these functions in the ChatServlet class.
 * */

package com.chatservlet;

import chatmanager.ChatManager;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ListIterator;
import java.util.Locale;

public class ServletHelper extends HttpServlet {
    private ChatManager chatmanager = ChatManager.getInstance();
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("MM/dd/yyyy, hh:mm:ss a", Locale.ENGLISH);
    private static final DateTimeFormatter FORMATTER_2 = DateTimeFormatter.ofPattern("MM/dd/yyyy, h:mm:ss a", Locale.ENGLISH);


    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String deleteFrom = request.getParameter("deletefrom");
        String deleteTo = request.getParameter("deleteto");
        String[] deleteDateRange = new String[2];
        deleteDateRange[0] = deleteFrom;
        deleteDateRange[1] = deleteTo;

        session.setAttribute("chat", chatmanager.listMessages());

        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    protected ZonedDateTime stringToZonedDate(String date) {
        LocalDateTime ld;
        try {
            ld = LocalDateTime.parse(date, FORMATTER);
        }
        catch (Exception e) {
          ld = LocalDateTime.parse(date, FORMATTER_2);
        }
        ZonedDateTime zt = ZonedDateTime.of(ld,
                ZoneId.of("Canada/Central"));
        return zt;
    }
    protected void downloadChat(HttpServletResponse response, HttpServletRequest request, ChatManager chat) throws IOException, ServletException {
        String format = request.getParameter("format");
        String fileType;

        // Return xml or plaintext
        if (format.equals("xml")) {
            response.setContentType("text/xml");
            fileType = "ChatLogs.xml";
        } else {
            response.setContentType("text/plain");
            fileType = "ChatLogs.txt";
        }

        ZonedDateTime fromTime = stringToZonedDate(request.getParameter("from"));
        ZonedDateTime toTime = stringToZonedDate(request.getParameter("to"));

        response.setHeader("Content-Disposition", "attachment;filename=" + fileType);
        response.setHeader("Content-Transfer-Encoding", "binary");

        ServletContext ctx = getServletContext();
        String relativePath = ctx.getRealPath("/" + fileType);

        ListIterator<String> iterator = chat.listMessages(fromTime, toTime).listIterator();
        try (PrintWriter pw = new PrintWriter(new FileOutputStream(relativePath))) {
            while (iterator.hasNext()) {
               pw.println(iterator.next());
            }

        }
//        request.getRequestDispatcher("/com/chatservlet/ChatServlet.java").forward(request, response);
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    protected void doList(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();

        String from = request.getParameter("from");
        String to = request.getParameter("to");
        String[] dateRange = new String[2];
        dateRange[0] = from;
        dateRange[1] = to;

        session.setAttribute("chat", chatmanager.listMessages());
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    // Make sure user doesn't cache the data
    protected void clearCache(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        response.setHeader("Cache-Control", "no-cache"); //Forces caches to obtain a new copy of the page from the origin server
        response.setHeader("Cache-Control", "no-store"); //Directs caches not to store the page under any circumstance
        response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
        response.setHeader("Pragma", "no-cache"); //HTTP 1.0 backward compatibility
    }

    protected void checkHeader(HttpServletRequest request) throws ServletException {
        String refererHeader = request.getHeader("referer");
        // no need to continue if the header is missing
        if (refererHeader == null) {
            // response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            // return;
            throw new ServletException("Referer Header is null");
        }
    }
}
