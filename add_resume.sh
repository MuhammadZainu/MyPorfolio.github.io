#!/bin/bash

# Script to help add resume files to the portfolio
echo "📄 Resume Setup Script for Muhammad Zain's Portfolio"
echo "=================================================="
echo ""

# Check if assets/documents directory exists
if [ ! -d "assets/documents" ]; then
    echo "Creating assets/documents directory..."
    mkdir -p assets/documents
fi

echo "📁 Current directory structure:"
ls -la assets/documents/
echo ""

echo "📋 Instructions to add your resume:"
echo "1. Copy your resume PDF file to: assets/documents/Muhammad_Zain_Resume.pdf"
echo "2. Copy your resume DOC file to: assets/documents/Muhammad_Zain_Resume.docx"
echo "3. Make sure filenames are exactly as shown above"
echo ""

echo "💡 Example commands:"
echo "cp /path/to/your/resume.pdf assets/documents/Muhammad_Zain_Resume.pdf"
echo "cp /path/to/your/resume.docx assets/documents/Muhammad_Zain_Resume.docx"
echo ""

echo "✅ After adding files, refresh your browser to test downloads!"
echo ""

# Check if files exist
if [ -f "assets/documents/Muhammad_Zain_Resume.pdf" ]; then
    echo "✅ PDF resume found: assets/documents/Muhammad_Zain_Resume.pdf"
else
    echo "❌ PDF resume not found: assets/documents/Muhammad_Zain_Resume.pdf"
fi

if [ -f "assets/documents/Muhammad_Zain_Resume.docx" ]; then
    echo "✅ DOC resume found: assets/documents/Muhammad_Zain_Resume.docx"
else
    echo "❌ DOC resume not found: assets/documents/Muhammad_Zain_Resume.docx"
fi
